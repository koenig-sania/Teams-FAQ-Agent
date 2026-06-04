// index.mjs
import { startServer } from '@microsoft/agents-hosting-express'
import { AgentApplication, MemoryStorage } from '@microsoft/agents-hosting'

class EchoAgent extends AgentApplication {
  constructor (storage) {
    super({ storage })

    this.onConversationUpdate('membersAdded', this._help)
    this.onMessage('/help', this._help)
    this.onActivity('message', this._echo)
  }

  _help = async context => 
    await context.sendActivity(`Welcome to the Echo Agent sample 🚀. 
      Type /help for help or send a message to see the echo feature in action.`)

  _echo = async (context, state) => {
    let counter= state.getValue('conversation.counter') || 0
    await context.sendActivity(`[${counter++}]You said: ${context.activity.text}`)
    state.setValue('conversation.counter', counter)
  }
}

startServer(new EchoAgent(new MemoryStorage()))