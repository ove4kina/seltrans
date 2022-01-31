process.env.NODE_ENV = 'test';

let expect = require('chai').expect;
let request = require('request');

let host = 'http://localhost:4040';
let pages = [
    {
        name: 'Index',
        items: [
            {
                language: 'ru',
                url: '/'
            }
        ]
    },
    {
        name: 'Products',
        items: [
            {
                language: 'ru',
                url: '/ru/products'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/la-17-sat-160-1200'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/la-19-21-sat-155-800'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/la-19-22-sat-155-800'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/la-19-sat-160-1200'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/ta-09-sat-160-3200'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/ta-11-sat-160-2400'
            },
            {
                language: 'ru',
                url: '/ru/products/current-collectors/ta-16-sat-160-2400'
            },
            {
                language: 'ru',
                url: '/ru/products/runners/p-01-00-0001'
            },
            {
                language: 'ru',
                url: '/ru/products/runners/p-02-00-0001'
            },
            {
                language: 'ru',
                url: '/ru/products/runners/p-05-00-0001'
            },
            {
                language: 'ru',
                url: '/ru/products/runners/p-06-00-0001'
            },
            {
                language: 'ru',
                url: '/ru/products/runners/p-09-00-0000'
            }
        ]
    },
    {
        name: 'Engineering',
        items: [
            {
                language: 'ru',
                url: '/ru/engineering'
            }
        ]
    },
    {
        name: 'Modeling',
        items: [
            {
                language: 'ru',
                url: '/ru/modeling'
            }
        ]
    },
    {
        name: 'Spares',
        items: [
            {
                language: 'ru',
                url: '/ru/spares'
            }
        ]
    },
    {
        name: 'Blog',
        items: [
            {
                language: 'ru',
                url: '/ru/blog'
            },
            {
                language: 'ru',
                url: '/ru/blog/alstom-introduced-the-new-design-of-aptis'
            },
            {
                language: 'ru',
                url: '/ru/blog/exhibition-innotrans'
            },
            {
                language: 'ru',
                url: '/ru/blog/four-horsepower-electric-train-stadler'
            },
            {
                language: 'ru',
                url: '/ru/blog/hong-kong-express'
            },
            {
                language: 'ru',
                url: '/ru/blog/latvian-railways'
            },
            {
                language: 'ru',
                url: '/ru/blog/leo-express'
            },
            {
                language: 'ru',
                url: '/ru/blog/patent-for-electric-vacuum-cleaner'
            },
            {
                language: 'ru',
                url: '/ru/blog/pendolino-train-in-greece'
            },
            {
                language: 'ru',
                url: '/ru/blog/talgo-signed-a-10-year-strategic-agreement'
            }
        ]
    },
    {
        name: 'History',
        items: [
            {
                language: 'ru',
                url: '/ru/history'
            }
        ]
    },
    {
        name: 'Contacts',
        items: [
            {
                language: 'ru',
                url: '/ru/contacts'
            }
        ]
    },
    {
        name: 'About',
        items: [
            {
                language: 'ru',
                url: '/ru/about'
            }
        ]
    },
    {
        name: 'Privacy',
        items: [
            {
                language: 'ru',
                url: '/ru/privacy'
            }
        ]
    },
];

pages.map((page) => {
    describe(page.name, () => {
        page.items.map((item) => {
            describe('/GET ' + item.url, () => {
                it(page.name + ' ' + item.language + ' page should return 200', (done) => {
                    request(host + item.url, function (error, response, body) {
                        expect(response.statusCode).to.equal(200);
                        done();
                    });
                });
            });
        })
    });
});