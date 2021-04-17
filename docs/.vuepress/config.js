module.exports = {
  themeConfig: {
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Guide', link: '/mydir/test.html' }
    // ],
    sidebar: [
      '/',
      {
        title: '端外基础',
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          '/basis/protocol/'
        ]
      },
      {
        title: '核心前端',
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          '/core/html-css/basis/',
          '/core/html-css/css3/',
          '/core/html-css/layout/',
          // '/core/js',
        ]
      },
      {
        title: 'Node.js',
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          '/node-js/server/http/',
        ]
      }
    ]
  }
}
