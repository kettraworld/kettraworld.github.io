import transaction from "#model/transaction";

export async function approved(i) {
  await transaction.update({ status: '1' }, { where: { uuid: `${i}` } });
};

export async function pending(i) {
  await transaction.update({ status: '2' }, { where: { uuid: `${i}` } });
};

export async function disapproved(i) {
  await transaction.update({ status: '2' }, { where: { uuid: `${i}` } });
};

