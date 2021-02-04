## animal-cli

animal-cli是一个通用脚手架工程，用户可以添加自己维护的工程模板，用于初始化项目。脚手架以下命令行操作：

## 1、anim add

添加脚手架工程模板，通过交互式提示用户添加模板信息：

```
E:\animal>anim add
     _          _                 _   _
    / \   _ __ (_)_ __ ___   __ _| | | |
   / _ \ | '_ \| | '_ ` _ \ / _` | | | |
  / ___ \| | | | | | | | | | (_| | | |_|
 /_/   \_\_| |_|_|_| |_| |_|\__,_|_| (_)

? 请输入模板名称 zMock
? 请输入模板地址 https://github.com/Anglay/zMock.git#master
√ 模板添加成功！

* 支持以下模板创建项目

✔ zMock
```

## 2、anim list

查看已经添加维护的工程模板

```
E:\animal>anim list
     _          _                 _   _
    / \   _ __ (_)_ __ ___   __ _| | | |
   / _ \ | '_ \| | '_ ` _ \ / _` | | | |
  / ___ \| | | | | | | | | | (_| | | |_|
 /_/   \_\_| |_|_|_| |_| |_|\__,_|_| (_)

* 支持以下模板创建项目

✔ zMock
```

## 3、anim init

用于初始化项目

```
E:\animal>anim init
     _          _                 _   _
    / \   _ __ (_)_ __ ___   __ _| | | |
   / _ \ | '_ \| | '_ ` _ \ / _` | | | |
  / ___ \| | | | | | | | | | (_| | | |_|
 /_/   \_\_| |_|_|_| |_| |_|\__,_|_| (_)

? 请输入项目名称 zMock-test
? 请输入项目描述 zMock-test
? 请选择项目模板 zMock
√ 模板下载成功！
✔ 创建: zMock-test/.editorconfig
✔ 创建: zMock-test/.eslintrc
✔ 创建: zMock-test/.gitee
✔ 创建: zMock-test/.gitignore
✔ 创建: zMock-test/.roadhogrc.mock.js
✔ 创建: zMock-test/.webpackrc
✔ 创建: zMock-test/dist
✔ 创建: zMock-test/mock
✔ 创建: zMock-test/public
✔ 创建: zMock-test/README.en.md
✔ 创建: zMock-test/README.md
✔ 创建: zMock-test/src
✔ 创建: zMock-test/yarn.lock
✔ 创建: zMock-test/package.json


? 是否安装依赖(npm install)？ (Use arrow keys)
> 是(YES)
  否(NO)
```

## 4、anim del

用于删除以添加的模板

```
E:\animal>anim del
     _          _                 _   _
    / \   _ __ (_)_ __ ___   __ _| | | |
   / _ \ | '_ \| | '_ ` _ \ / _` | | | |
  / ___ \| | | | | | | | | | (_| | | |_|
 /_/   \_\_| |_|_|_| |_| |_|\__,_|_| (_)

? 请选择需要删除的模板 zMock
√ 模板删除成功！

* 暂无模板，请通过anim add添加模板管理
```

