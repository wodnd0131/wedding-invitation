const fs = require('fs');
const path = require('path');

function generateDataFile() {
  const json = process.env.INVITATION_DATA_JSON;
  const outPath = path.join(__dirname, '..', 'src', 'data', 'invitation.data.ts');

  if (!json) {
    if (fs.existsSync(outPath)) {
      console.log('[invitation-data] INVITATION_DATA_JSON 미설정 — 로컬 invitation.data.ts 그대로 사용');
    } else {
      console.warn(
        '[invitation-data] INVITATION_DATA_JSON도 없고 src/data/invitation.data.ts도 없습니다.\n' +
          '로컬: invitation.data.example.ts를 invitation.data.ts로 복사해 채우세요.\n' +
          '배포(Vercel): INVITATION_DATA_JSON 환경변수를 설정하세요.'
      );
    }
    return;
  }

  const { weddingDate, images, ...rest } = JSON.parse(json);

  const content = `// 이 파일은 빌드 시 INVITATION_DATA_JSON 환경변수로부터 자동 생성됩니다. 직접 수정하지 마세요.
import { CoreInvitationData } from './invitation.types';

export const invitationData: CoreInvitationData = {
  ...${JSON.stringify(rest, null, 2)},
  weddingDate: new Date('${weddingDate}'),
};
`;

  fs.writeFileSync(outPath, content);
  console.log('[invitation-data] invitation.data.ts 생성 완료 (환경변수 기반)');
}

function generateImagesFile() {
  const json = process.env.INVITATION_IMAGES_JSON;
  const outPath = path.join(__dirname, '..', 'src', 'data', 'invitation.images.ts');

  if (!json) {
    if (fs.existsSync(outPath)) {
      console.log('[invitation-images] INVITATION_IMAGES_JSON 미설정 — 로컬 invitation.images.ts 그대로 사용');
    } else {
      console.warn(
        '[invitation-images] INVITATION_IMAGES_JSON도 없고 src/data/invitation.images.ts도 없습니다.\n' +
          '로컬: invitation.images.example.ts를 invitation.images.ts로 복사해 채우세요.\n' +
          '배포(Vercel): INVITATION_IMAGES_JSON 환경변수를 설정하세요.'
      );
    }
    return;
  }

  const images = JSON.parse(json);

  const content = `// 이 파일은 빌드 시 INVITATION_IMAGES_JSON 환경변수로부터 자동 생성됩니다. 직접 수정하지 마세요.
import { ImageSlots } from './invitation.types';

export const images: ImageSlots = ${JSON.stringify(images, null, 2)};
`;

  fs.writeFileSync(outPath, content);
  console.log('[invitation-images] invitation.images.ts 생성 완료 (환경변수 기반)');
}

generateDataFile();
generateImagesFile();
