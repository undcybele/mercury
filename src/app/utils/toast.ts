import {NbComponentStatus, NbToastrService} from "@nebular/theme";

export function showToast(toastService: NbToastrService, msg: string, title: string, status: NbComponentStatus) {
  toastService.show(msg, title, {status});
}
