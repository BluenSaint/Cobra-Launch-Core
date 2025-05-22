import { autoRebuildDisputes } from "../../lib/rebuilder";
import { IsNotEmpty, validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

class RebuildRequest {
  @IsNotEmpty({ message: "Previous report is required" })
  prev: string;

  @IsNotEmpty({ message: "Current report is required" })
  current: string;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const rebuildRequest = plainToClass(RebuildRequest, req.body);
      const errors = validateSync(rebuildRequest);

      if (errors.length > 0) {
        return res
          .status(400)
          .json({ errors: errors.map((err) => err.constraints) });
      }

      const { prev, current } = rebuildRequest;

      const actions = autoRebuildDisputes(prev, current);
      return res.status(200).json({ actions });
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
