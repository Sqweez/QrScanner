module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    target: [
                        {
                            target: 'nsis',
                            arch: [
                                'x64',
                                'ia32'
                            ],
                        }
                    ],
                },
                extraFiles: [
                    'assets'
                ],
                productName: 'Сканер QR-кодов для БИН-ИНН',
                releaseInfo: {
                    releaseName: 'Сканер QR-кодов для БИН-ИНН',
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true
                },
            },
        }
    }
};