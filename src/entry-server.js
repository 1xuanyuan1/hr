import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    // store.dispatch('global/setCookies', context.cookies)
    let cookie = ''
    for (let [key, val] of Object.entries(context.cookies)) {
      cookie += `${key}=${val};`
    }
    // set server-side router's location
    router.push(context.url)

    // wait until router has resolved possible async components and hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes, reject with 404
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
            cookie
          }).catch((err) => {
            if (err && err.code === -400) { // 若未登录则跳到登录页
              router.push('/login')
            } else { // 其他错误直接抛出异常
              reject(err)
            }
          })
        }
      })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as window.__INITIAL_STATE__.
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
