export interface SocketIODTO {
  buffer: ArrayBuffer,
  src: "stderr" | "stdout"
}

/**
 * Possible request messages.
 */
export const MESSAGES = {
  REPLY_LOG: "replyLogs"
}
