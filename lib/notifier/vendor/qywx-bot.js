const {doGet, doPost} = require('../util')

/**
 * 企业微信群机器人配置说明
 * https://developer.work.weixin.qq.com/document/path/91770
 *
 * @param title
 * @param content
 * @param qywxWebhook
 * @returns {Promise<{msg: string, success: boolean}>}
 */
async function sendQywxBot({
                             title = '',
                             content = '',
                             qywxWebhook
                           }) {
  try {
    const res = await doPost(
      qywxWebhook,
      {
        msgtype: 'text',
        text: {
          content: `【${title}】\n${content}`,
          mentioned_mobile_list: ["@all"]
        }
      }
    )

    if (res.errcode != 0) {
      throw res.errmsg
    }
  } catch (e) {
    return {success: false, msg: `企业微信 webhook 推送失败: ${e}`}
  }

  return {success: true, msg: '企业微信 webhook 推送成功'}
}

module.exports = sendQywxBot
