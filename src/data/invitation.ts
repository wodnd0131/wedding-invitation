// 타입은 이 파일에서, 실제 데이터는 invitation.data.ts + invitation.images.ts(둘 다 gitignore)에서
// 가져옵니다. 로컬에 없다면 각각 invitation.data.example.ts / invitation.images.example.ts를
// 복사해서 채우세요.
import { InvitationData } from './invitation.types';
import { invitationData as coreData } from './invitation.data';
import { images } from './invitation.images';

export * from './invitation.types';

export const invitationData: InvitationData = {
  ...coreData,
  images,
};
