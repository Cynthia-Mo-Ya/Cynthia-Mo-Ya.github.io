# 🕷️ 小蜘蛛接入 DeepSeek 手把手教程

网站上的小蜘蛛问答分两层：**正常走 DeepSeek 真 AI 回答**；如果接口没配好或网络抽风，会**自动降级**到内置的本地知识库回答，蜘蛛永远不会冷场。所以你随时可以做这个接入，做好之前网站也能正常用。

整个流程 10 分钟左右，花费极低（DeepSeek 充 10 元能答几万次）。

---

## 第一步：拿到 DeepSeek API Key

1. 打开 https://platform.deepseek.com ，用手机号注册/登录
2. 左侧菜单点 **API Keys** → **创建 API Key**，名字随便填（比如 `spider`）
3. 复制弹出的 `sk-` 开头的字符串——**只显示一次，先存到备忘录**
4. 左侧 **充值** 里充个 10 元就足够用很久了

> ⚠️ 这个 key 等于你的钱包，**不要**发给任何人、**不要**写进网站代码里。我们的做法是把它存在 Vercel 的环境变量里，网页上谁也看不到。

## 第二步：把仓库导入 Vercel

蜘蛛的"翻译官"（代理函数）我已经写好了，就在你网站仓库的 `api/ask.js`。GitHub Pages 不会运行它，但 Vercel 会。

1. 打开 https://vercel.com ，用 GitHub 账号登录（你做金陵残梦导航站时用过）
2. 点 **Add New… → Project**
3. 在仓库列表里找到 **Cynthia-Mo-Ya.github.io** → **Import**
4. **Project Name 改成 `cynthia-spider`**（重要！网站代码里写的就是这个地址）
5. Framework Preset 选 **Other**，其他都不用动
6. 展开 **Environment Variables**，添加一条：
   - Name: `DEEPSEEK_API_KEY`
   - Value: 粘贴你第一步拿到的 `sk-...`
7. 点 **Deploy**，等它转完

完成后你会得到一个地址：`https://cynthia-spider.vercel.app`。

> 如果项目名 cynthia-spider 被占用了，Vercel 会给你别的名字（比如 cynthia-spider-xxx.vercel.app）。这时打开网站仓库里的 `assets/js/features.js`，把第一屏附近的
> `var PROXY_URL = 'https://cynthia-spider.vercel.app/api/ask';`
> 改成你的实际地址，然后 git push 即可。

## 第三步：测试

部署完成后，在浏览器打开你的网站 https://cynthia-mo-ya.github.io ，滑到小蜘蛛那里，点蜘蛛，随便问一句（比如"她最得意的项目是什么？"）。能答出具体内容（而不是固定的几句套话）就说明接通了。

想直接测接口本身，可以在电脑 PowerShell 里运行：

```powershell
Invoke-RestMethod -Uri "https://cynthia-spider.vercel.app/api/ask" -Method Post -ContentType "application/json" -Body '{"question":"她是谁?","lang":"zh"}'
```

返回一段 `answer` 就是成功。

## 第四步（也是最好玩的）：喂知识库

蜘蛛知道的一切都写在仓库的 **`api/knowledge.js`** 这一个文件里——就是一段"系统提示词"，里面有：

- 蜘蛛的人设和说话风格（简短、有趣、不吹牛）
- 你的全部档案：教育、项目、能力、工具、联系方式
- 禁止事项（不编造、不跑题、不超字数）

想让蜘蛛学会新东西（比如新项目、获奖、新作品），直接用文字写进对应段落，然后：

```powershell
git add api/knowledge.js
git commit -m "更新蜘蛛知识库"
git push
```

push 之后 Vercel 会自动重新部署（约 30 秒），蜘蛛立刻就"学会"了。**不需要训练，不需要重启，改文件就行。**

## 它是怎么工作的（一张图）

```
访客提问
   │
   ▼
网页 features.js ──POST──▶ cynthia-spider.vercel.app/api/ask   ← 你的 key 藏在这里
   │（失败/超时自动降级）          │
   ▼                            ▼ 带着 knowledge.js 的人设+档案
本地知识库回答              DeepSeek (deepseek-chat)
                                 │
                                 ▼
                            蜘蛛的回答打字机式出现
```

代理里还做了两层保护：
- **域名白名单**：只有你的网站能调用这个接口，别人复制链接也用不了
- **限流**：同一访客每分钟最多 8 次，防止有人恶意刷你的钱

## 常见问题

| 现象 | 原因 / 解决 |
|---|---|
| 蜘蛛总是回答那几句固定的话 | 走了降级 = 接口没通。检查 Vercel 项目名是否是 cynthia-spider、环境变量是否配置、是否部署成功 |
| 接口报 `DEEPSEEK_API_KEY not configured` | 第二步第 6 小步没做，去 Vercel → Settings → Environment Variables 补上，然后 Redeploy |
| 接口报 402 / Insufficient Balance | DeepSeek 余额用完了，去充值 |
| 想换蜘蛛性格 | 改 `api/knowledge.js` 里【说话风格】那段，push |
