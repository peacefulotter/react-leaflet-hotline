const glob = require('glob')
const path = require('path')

const srcPath = path.resolve(__dirname, 'src')
const docsPath = path.resolve(__dirname, 'docs')

const getDocFiles = () => glob.sync(path.join(__dirname, 'docs', '*.md')).map((filePath) => {

    const filename = filePath.slice(docsPath.length + 1, filePath.length - '.md'.length )
    console.log('Adding', filename + '.md to the docs');

    return ({
      name: filename,
      content: `./docs/${filename}.md`
    })
})
  
module.exports = {
    title: 'react-leaflet-hotline',
    pagePerSection: true,
    exampleMode: 'expand',
    skipComponentsWithoutExample: true,
    styleguideDir: 'dist-docs',
    sections: [
    //   { name: 'Introduction', content: './docs/Introduction.md', sectionDepth: 1 },
    //   { name: 'Installation', content: './docs/Installation.md', sectionDepth: 1 },
      ...getDocFiles()
    ],
    require: [path.join(docsPath, 'utils', '_setup.js'), path.join(docsPath, 'utils', '_custom.css')],
    webpackConfig() {
        return {
            resolve: {
                alias: { 'react-leaflet-hotline': srcPath }
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css$/i,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.png$/,
                        loader: 'url-loader'
                    }
                ]
            }
        }
    },
}