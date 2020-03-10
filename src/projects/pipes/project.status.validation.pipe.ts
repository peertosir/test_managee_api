import {PipeTransform, UnprocessableEntityException} from "@nestjs/common";
import {ProjectStatusEnum} from "../project-status.enum";

export class ProjectStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        ProjectStatusEnum.IDLE,
        ProjectStatusEnum.TESTING,
        ProjectStatusEnum.FINISHED
    ];

    transform(value: any): any {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)) {
            throw new UnprocessableEntityException('Status field has wrong value')
        }
        return value;
    }

    private isStatusValid(status:any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}