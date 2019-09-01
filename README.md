# ssr-loadable-react
This is tutorial. How to make SSR in react with loadable and prefetch data in component instead cdm
And code splitting with chunks and others "cookies"

#How to install
1. git clone this repo on your PC
2. go to dir with project
3. npm i
4. for build client dist run command: npm run dev:build-client
5. for build server dist run command: npm run dev:build-server

##What we have on the start?
After build in webpack we have 2 folder. For server rendering we have ./build, and for client we have client.
Look at index.js. Here you have started you app. Express should give away static files, images, styles and other by the request.
In code is seems so: app.use('/', express.static('public')); When browser want get images by url /bg.jpg we have rules for all
paths: go to the public folder, when webpack collect all graphics and static files and chunks. 

##What about routes?
Maybe you think that route config need collect every time when you refresh html page in the browser. If you have big
site or app, you can't do it very often. Many requests can down our express server by highLoad. For create and update 
Routes you can once get it after build app so: '/getRoutes'. But in other way how get new
article or news if route have been collected before? This problem you can resolve if get routes again: '/getRoutes/'.
Imagine you have big site with hundreds or thousands urls. Of course all this urls you need get from server. So our app
can do it in route config. We fetching page by the page with urls list and then write it in our route-config. 

##First page magic
When you open app in browser after you has built routes look at the dev tools in chrome - network tab. Open response for our request.
What you see? All our requests, which has been written in fetchData worked on the server. In INITIAL_STATE we get all data for 
current page. If you will push refresh button on the every other page, you would get INITIAL_STATE for that page too. 
However, changing url from menu without refresh page don`t fill INITIAL_STATE. So work our simple way - SPA. On the client 
all our fetches called in the constructor - like componentDidMount, but not equal componentDidMount absolutely. On the 
server our fetches collect in array, and called remoutely.

##Code splitting
We use lodable, because it more simple than other bicycle. Every page have collection of chunks for correctly work. Every
chunk downloaded by the request depend on asset-manifest.json. In the renderer scripts connected to html page. But not all
scripts(chunks) connected. We match current url with necessary templates(chunks) in assets-manifest and connect only this scripts.
Styles connected like script. Webpack generate chunks as we want, with named instead id in production, and so much how we want.

##Server problem with window, document and other
When you refactoring you app from SPA to SRA problem with window not found error inavitable. If error in your app, just add check
if (typeof window !== 'undefined') ... If error in npm package, you can create issue in github, or download this package
and fix it local and save as your component. Unfortunately, we haven`t guarantee that this issues will be fixed soon.
Other error, like document is undefined you can fix as a window error. Good Luck! 
