export interface SocketIODTO {
  buffer: string,
  src: "stderr" | "stdout"
}

/**
 * Possible request messages.
 */
export const MESSAGES = {
  REPLY_LOG: "replyLogs"
}
