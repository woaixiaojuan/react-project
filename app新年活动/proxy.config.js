// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {

  // 获取活动列表
  'GET /wx/voteActive/get.do'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        code: 2001,
        success: true,
        'data|4': [{
          'id|+1': 1,
          'title|1': ['lol季前赛', '影视品佳竞赛', '2016赛季lol总决赛', '另一个天堂作品投票', '火锅英雄大众投票'],
          'content': '详情',
          'rule': '规则',
          'mark': '2',
          'createTime': '2015-05-07 15:20:20',
          'startTime': '@datetime',
          'endTime': '2015-06-07 15:20:20',
          'updateTime': '2015-07-07 15:20:20',
        }],
      })
    );
    },
  500);
  },
  // 添加活动
  'GET /wx/voteActive/add.do'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        code: 2001,
        success: true,
        data: {
          'Id': '123',
          'mark': '1',
        },
        msg: '投票成功！',
      })
    );
    },
  500);
  },
  // 编辑活动
  'POST /wx/voteActive/update.do'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        code: 2001,
        success: true,
        msg: '活动修改成功',
      })
    );
    },
  500);
  },
  // 删除活动
  'POST /wx/voteActive/delete.do'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        code: 2001,
        success: true,
        msg: '删除成功',
      })
      );
    },
    500);
  },
/*---------------------------------------------------------------------------------------------------------------------*/
  'GET /voteOptions/get.do'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        'content|4': [{
          'activeId|+1': 2324,
          'title|1': ['lol季前赛', '影视品佳竞赛', '2016赛季lol总决赛'],
          startTime: '2016-11-06',
          endTime: '2016-12-06',
          state: '上架',
        }],
      })
      );
    },
      100);
  },


  'GET /wx/voteActive/source.do': require('mockjs').mock({
    success: true,
    data: [{
      'source': '1',
      'sourceName': 'aaaa',
      'activeId': 102,
    },
    {
      'source': '2',
      'sourceName': 'bbbb',
      'activeId': 102,
    },
    {
      'source': '3',
      'sourceName': 'cccc',
      'activeId': 102,
    },
    ],
  }),
  'GET /api/zuoping.do': require('mockjs').mock({
    success: true,
    data: 'hello',
  }),

  'POST /api/login.do'(req, res) {
    setTimeout(() => {
      res.json({
        success: true,
        msg: '登录成功',
      });
    }, 1500);
  },
  '/wx/voteActive/option/get.do'(req, res) {
    setTimeout(() => {
      res.json(require('mockjs').mock({
        success: true,
        'data|3': [
          {
            'activeId': 2324,
            'optionId|+1': 100,
            'orderId|+1': 1,
            'contentType|+1': ['1', '2', '3'],
            'content': '<p>hello world!</p><p>hello world!</p>',
            'author': '指环王',
            'source': '2',
            'sourceName': '北京',
            'title': '这是影评',
            'img': "@image('600x230', '@color', '@color', '@name')",
            'link|+1': ['', '<iframe src=https://v.qq.com/iframe/player.html?vid=k00228zkgf3&tiny=0&auto=0></iframe>', '<iframe src="https://v.qq.com/iframe/player.html?vid=t0022o60r1u&tiny=0&auto=0" allowfullscreen></iframe>'],
            'description': '合一集团，旧称优酷土豆集团，是中国大陆视频分享网站优酷网与土豆网合并后成立的传媒公司，在2015年8月更换现名称，并以宣传格言“合一而为”做为其合一文化集团的理念，2016年被阿里巴巴集团正式收购',
            'voteCount': '@integer(500, 2000)',
          }],
      }));
    }, 1000);
  },

  '/wx/voteActive/option/add.do'(req, res) {
    setTimeout(() => {
      res.json({
        success: true,
        data: {
          activeId: '2324',
          optionId: '999',
          orderId: 1000,
          author: 'zhang',
          content: '',
          contentType: '3',
          sourceName: '北京',
          description: 'haha',
          img: 'http://resource.handsight.com.cn/TVHelp01/img/upload/1480559163272_391.jpg',
          link: 'write',
          source: '1',
          title: 'win10',
          voteCount: 0,
        },
      });
    }, 1000);
  },

  '/wx/voteActive/option/update.do'(req, res) {
    setTimeout(() => {
      res.json({
        success: true,
      });
    }, 1500);
  },

  '/wx/voteActive/option/delete.do'(req, res) {
    setTimeout(() => {
      res.json({
        success: true,
      });
    }, 1000);
  },
};

