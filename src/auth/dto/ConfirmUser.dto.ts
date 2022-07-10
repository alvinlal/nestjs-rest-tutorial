import { IsConfirmTokenValid } from '../../validators/IsConfirmTokenValid.validator';

export default class ConfirmUserDto {
  @IsConfirmTokenValid({ message: 'Token is invalid or expired!' })
  token: string;
}
