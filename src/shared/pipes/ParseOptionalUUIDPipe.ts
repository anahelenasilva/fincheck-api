import { ParseUUIDPipe } from "@nestjs/common";

export class ParseOptionalUUIDPipe extends ParseUUIDPipe {
  override async transform(value: any, metadata: any) {
    if (typeof value === 'undefined') {
      return '';
    }

    return super.transform(value, metadata);
  }
}
