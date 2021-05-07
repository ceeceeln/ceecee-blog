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
        collapsable: false,
        children: [
          '/basis/protocol/'
        ]
      },
      {
        title: '核心前端',
        collapsable: false,
        // initialOpenGroupIndex: -1,
        children: [
          {
            title: 'HTML & CSS',
            children: [
              '/core/html-css/basis/',
              '/core/html-css/css3/',
              '/core/html-css/layout/'
            ]
          },
          {
            title: 'JavaScript',
            children: [
              '/core/js/js-core/',
              '/core/js/es6/',
              '/core/js/regex/'
            ]
          }
        ]
      },
      {
        title: '前端工程',
        collapsable: false,
        children: [
          '/development/build/webpack/'
        ]
      },
      {
        title: '前端框架',
        collapsable: false,
        children: [
          '/framework/vue/source/'
        ]
      },
      {
        title: 'Node.js',
        collapsable: false,
        children: [
          '/node-js/server/http/'
        ]
      }
    ]
  }
}
