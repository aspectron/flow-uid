// @ts-ignore
export const FlowUid = (typeof vertx !== 'undefined' && vertx !== null) ? require("./lib/vertx-uid") : require("./lib/uid");