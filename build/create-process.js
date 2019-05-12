'use strict'
const inquirer = require('inquirer') //给用户提供交互式的命令
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const compose = require('onion-compose')

//已经选定多项目名称
const chioceProjectName = process.env.PROJECT_NAME || ""
//是否是dev
const isLocalDevelop = typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== "production"
//执行程序的配置
const processConfigPath = process.env.PROCESS_CONFIG_PATH || path.join(__dirname, "../processConfig")
//所有html入口
const allhtmls = glob.sync(path.join(__dirname, "../src/pages/*/*.html")) || []
//查找所有项目名称
const projects = allhtmls.reduce((map, html) => {
  const basename = path.posix.basename(html, ".html")
  const jss = glob.sync(path.join(html.replace(basename + '.html', ''), '/*.js'))
  if (jss.length) {
    map[basename] = {
      basename,
      htmlPath: html,
      jsPath: jss[0]
    }
  }
  return map
}, {})
//cmd交互 在命令行中对用户提出问题
const choiceByObject = (sender, filter) => {
  const promptList = [{
    type: 'list',
    message: '请选择编译一个项目:',
    name: 'project',
    choices: [...Object.keys(sender)], //列表选项
    filter: typeof filter === 'function' ? filter : (val => {
      return sender[val]
    }) //：对用户的回答进行过滤处理，返回处理后的值；
  }]
  return new Promise((resolve, reject) => {
    inquirer.prompt(promptList).then(resolve).catch(reject)
  })
}


const main = class {
  constructor() {}

  async start() {
    let processConfig = await this.getProcessConfig()
    let webpackConfig = await this.getWebpackConfigPath(processConfig.webpackConfigBasePath, processConfig.configPlugins)

    let {
      webpackConfig_Start_Plugins,
      webpackConfig_Middle_Plugins,
      webpackConfig_End_Plugins
    } = processConfig
    const mapFn = creator => creator(webpackConfig, processConfig)

    webpackConfig_Start_Plugins = Array.isArray(webpackConfig_Start_Plugins) ? webpackConfig_Start_Plugins.map(mapFn) : []
    webpackConfig_Middle_Plugins = Array.isArray(webpackConfig_Middle_Plugins) ? webpackConfig_Middle_Plugins.map(mapFn) : []
    webpackConfig_End_Plugins = Array.isArray(webpackConfig_End_Plugins) ? webpackConfig_End_Plugins.map(mapFn) : []

    processConfig.webpackConfigPlugins = [].concat(webpackConfig_Start_Plugins, webpackConfig_Middle_Plugins, webpackConfig_End_Plugins)

    return await this.returnWebpackConfig(webpackConfig, processConfig.webpackConfigPlugins)
  }


  //查找主项目或者入口
  async getProcessConfig() {
    //已经选定的项目
    let result = chioceProjectName

    if (result && projects[result]) {
      result = {
        project: projects[result]
      }
    } else {
      result = await choiceByObject(projects)
    }

    if (!result || !result.project) {
      console.log("没有找到相关项目:", result)
      process.exit(1)
    }

    const project = result.project
    const configPath = path.join(processConfigPath, `/${project.basename}/index.js`)
    const config = fs.existsSync(configPath) && require(configPath) || {}
    return Object.assign({}, require('../processConfig/defaultConfig/index'), {
      project
    }, config)
  }

  async getWebpackConfigPath(webpackConfigPath, middlewareArray = []) {
    const ntx = async function (context, next) {
      context.response = require(context.request.webpackConfigPath)
    }
    const ctx = {
      error: {},
      response: {},
      request: {
        webpackConfigPath
      }
    }

    //执行洋葱
    await compose(middlewareArray)(ntx, ctx)

    return ctx.response
  }

  async returnWebpackConfig(webpackConfig, middlewareArray = []) {
    const ntx = async function (context, next) {
      if (isLocalDevelop) {
        context.response = require('./base/webpack.dev.conf')(context.request)
      } else {
        context.response = require('./base/webpack.prod.conf')(context.request)
      }
    }
    const ctx = {
      error: {},
      response: {},
      request: webpackConfig
    }

    //执行洋葱
    await compose(middlewareArray)(ntx, ctx)

    return ctx.response
  }
}

module.exports = new main().start()
