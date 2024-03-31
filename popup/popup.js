// console.log("This is a popup.")

// document.getElementById("messageButton").onclick = () => {
//   chrome.runtime.sendMessage({ message: "hello" })
// }

const APP_HELPER = {
  isUrlLeetcode: () => {
    return true
  },
  isLoggedIn: () => {
    return true
  },
  getUser: () => {
    return "Rakesh"
  },
  getProblems: () => {
    return ["caapsad", "vasdaww"]
  },
}

const APP_RENDERS = {
  NOT_LEETCODE: {
    render: () => {
      return `<h1>NOT LEETCODE</h1>`
    },
    bindings: () => {
      console.log("NOT LEETCODE BINDINGS")
    },
  },

  NOT_LOGGED_IN: {
    render: () => {
      return `<h1>NOT_LOGGED_IN</h1>`
    },
    bindings: () => {
      console.log("NOT_LOGGED_IN BINDINGS")
    },
  },

  READY: {
    render: () => {
      return `<h1>READY</h1>`
    },
    bindings: () => {
      console.log("READY BINDINGS")
    },
  },

  TRACKING: {
    render: () => {
      return `<h1>TRACKING</h1>`
    },
    bindings: () => {
      console.log("TRACKING BINDINGS")
    },
  },
}

const APP_STATES = {
  NOT_LEETCODE: APP_RENDERS.NOT_LEETCODE,
  NOT_LOGGED_IN: APP_RENDERS.NOT_LOGGED_IN,
  READY: APP_RENDERS.READY,
  TRACKING: APP_RENDERS.TRACKING,
}

const APP_DATA = {
  user: "",
  problems: [],

  init: function () {
    this.user = APP_HELPER.getUser()
    this.problems = APP_HELPER.getProblems()
  },
}

const APP = {
  _cur_state: APP_STATES.NOT_LEETCODE,

  init: function () {
    if (!APP_HELPER.isUrlLeetcode()) {
      this.changeState(APP_STATES.NOT_LEETCODE)
      return
    }

    if (!APP_HELPER.isLoggedIn()) {
      this.changeState(APP_STATES.NOT_LOGGED_IN)
      return
    }

    APP_DATA.init()
    this.changeState(APP_STATES.READY)
  },

  changeState: function (newState) {
    this._cur_state = newState
    this.refresh()
  },

  refresh: function () {
    $("body").html(this._cur_state.render())
    this._cur_state?.bindings()
  },
}

$(document).ready(() => {
  APP.init()
})

chrome.runtime.onMessage.addListener((request) => {
  console.log("received", request)

  if (request.type === "PROBLEM_ADDED_DELETED") APP.init()
})
