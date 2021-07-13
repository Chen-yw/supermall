import { request } from "./request";
export function getDetail(iid) {
  return request({
    url: "detail",
    params: {
      iid
    }
  });
}

/* 由于在服务器拿到的数据不在一个地方，显得数据有点渣乱无章，所以可以将所有的数据保存到
 * 一个对象内，在进行开发的时候，只需要面向一个对象进行开发就可以了。
 */

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

/* class Person {
  // ES5 创建一个Class类  constructor() 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
// 创建类类Person的对象, 有两个属性，name和age
const p = new Person("why", 18); */
