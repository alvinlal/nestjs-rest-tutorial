import UtilService from '../../../utils/utils.service';

const mockUtilService: UtilService = {
  sendMail: jest.fn(() =>
    Promise.resolve({
      accepted: ['test4@gmail.com'],
      rejected: [],
      pending: [],
      envelopeTime: 482,
      messageTime: 394,
      messageSize: 775,
      response:
        '250 Accepted [STATUS=new MSGID=Yslz4MnYHerE3KlaYsl0QZbmr1scRIdWAAAAAmRsW1.gjzeWFDy-bC0uIx8]',
      envelope: {
        from: 'foo@example.com',
        to: ['test4@gmail.com'],
      },
      messageId: '<2dd5adaa-8e7b-872c-89a2-3a93a8c2542d@example.com>',
    }),
  ),
};

export default mockUtilService;
