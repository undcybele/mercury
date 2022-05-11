import {NbComponentStatus, NbToastrService} from "@nebular/theme";

export function showToast(toastService: NbToastrService, msg: string, title: string, status: NbComponentStatus) {
  console.log("in show toast")
  toastService.show(msg, title, {status});
}
