// @flow

type Mapper = any => any;

export default function (type: string, toPayload: Mapper = (v: any) => v) {
  return (v: any) => {
    let payload = toPayload(v);
    if (payload) {
      return { type, payload };
    }
    return { type };
  };
}
