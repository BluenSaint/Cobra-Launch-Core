import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("disputes")
export class DisputesController {
  @UseGuards(JwtAuthGuard)
  @Post("create")
  createDispute() {
    return { success: true, message: "Dispute created" };
  }

  @Post("upload/report")
  uploadReport() {
    console.log("File metadata:");
    console.log("User info:");
    return { success: true, message: "Report uploaded" };
  }
}
