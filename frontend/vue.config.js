module.exports = {
    devServer: {
    proxy: {
            '/api': {
		    target: 'http://203.254.143.175:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../backend/public',
    // indexPath: 'index.html',
    pages: {
        addBook: {
            entry: 'src/pages/page1/main.js',
            template: 'public/addBook.html',
            filename: 'addBook.html'
        },
        page2: {
            entry: 'src/pages/page2/main.js',
            template: 'public/page2.html',
            filename: 'page2.html'
        },
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    }
}
