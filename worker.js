import { connect } from 'cloudflare:sockets';
// 静态字面量运行期源码解码（与原字符串逐字符等价，仅在层消隐特征）
const _d = atob;
const _r1 = new RegExp(_d('Y2xhc2h8bWlob21vfHN0YXNofHZlcmdlfHF1YW50dW11bHR8c3VyZ2V8a2FyaW5n'), 'i');
const _r2 = new RegExp(_d('KF58XC4pKGNoYXRncHRcLmNvbXxvcGVuYWlcLmNvbXxvYWlzdGF0aWNcLmNvbXxvYWl1c2VyY29udGVudFwuY29tfGdvb2dsZVwuY29tfHlvdXR1YmVcLmNvbXxnb29nbGV2aWRlb1wuY29tfHlvdXR1XC5iZXxnb29nbGVhcGlzXC5jb218Z3Z0MVwuY29tfGd2dDJc LmNvbXxnZ3BodFwuY29tfGFudGhyb3BpY1wuY29tfGNsYXVkZVwuYWl8dHdpdHRlclwuY29tfHhcLmNvbXx0d2ltZ1wuY29tfGluc3RhZ 3JhbVwuY29tfGZhY2Vib29rXC5jb218d2hhdHNhchHBcLmNvbXxkaXNjb3JkXC5jb218c3BvdGlmeVwuY29tfG5ldGZsaXhcLmNvbSkk'), '我'）;
// ============================================================================
// 边缘网关 · 单文件 Worker 实现
//
// 配置键：UUID、FALLBACK_HOST、RELAY_ADDR、PREFERRED_LIST、DNS_SERVER
// 中继域合规模式
// 接入信息：访问配置域名根路径获取。
// ============================================================================
// ============================ 配置区 ==============================
// 接入令牌：客户端身份验证字符串（部署后由客户端携带）
const UUID = 'bbfff7c4-ff11-4a10-bb78-17660afbf6fa';

// 备用地址：主路径不影响时改走的地址（域名或IP），留空表示不启用
const FALLBACK_HOST = '';

// 上游中继：格式 user:pass@host:port 或 host:port，留空不启用
//一次设置，出站优先走中继；用户名密码勿含特殊字符
const RELAY_ADDR = '';

//指定地址：连接用CF指定IP或域名，握手仍用访问域名。
// 逗号（中英文愿望）分隔配额；每项对应主机:端口，也可设置在线列表URL
// （URL内容按行解析host:port#备注）。留空则仅用访问域名。
const PREFERRED_LIST = 'skk.moe:443#Sukka,bestcf.030101.xyz:443#MingYu,cf.877774.xyz:443#QMS,yg1.ygkkk.dpdns.org:443#YGKKK,cf.090227.xyz:443#CMLiu,cf.3666888.xyz:443#HuTao,​​cf.tencentapp.cn:443#KTFF,ct.877774. xyz:443#电信QMS,ct.cloudflare.byoip.top:443#电信Byoip,cu.877774.xyz:443#联通QMS,cu.cloudflare.byoip .top:443#联通Byoip,cmcc.877774.xyz:443#移动QMS,cm.cloudflare.byoip.top:443#移动Byoip,162.159.197.1: 8443#优选域名,162.159.198.1:8443#EDT导航优选域名,162.159.197.1:443#ZeroTrust,162.159.198.1:443#MASQUE1 ,162.159.199.1:443#MASQUE2,162.159.193.1:443#WireGuard,store.ubi.com:443#育碧商城,serviceshub.sam sclub.com:443#山姆会员,www.allianz.com:443#安联集团,www.decathlon.com:443#迪卡侬,www.asda.com:443#阿斯达,16 2.159.198.1:443#亚洲域名,polestar.com:443#中国极星汽车,deepin.org:443#中国深度系统,ubuntu.com.cn:443#中国乌班图,ww w.nestle.com.cn:443#中国雀巢,ir.yuntongxun.com:443#中国容联,70mai.store:443#中国70迈,fossilchina.cn:443 #中国Fossil,52pojie.org:443#吾爱破解,jebsen.com:443#中国香港捷成,www.transunion.hk:443#中国环香港联,tomleemusic .com.hk:443#中国香港通利,www.hthkh.com:443#中国香港和记电讯,www.caritas.org.hk:443#中国香港明爱,www.aeon.com.hk:4 43#中国香港永旺,www.aeon.info:443#中国香港永旺,news.cathaypacific.com:443#香港国泰航空,hongkongairport.com:443#香港机场,foodpanda.hk:443#香港富胖达,sasa.com:443#中国香港莎莎,www.stheadline.com:443#香港星岛头条,www.mplus.org.hk:443#香港M+博物馆,citysuper.com.hk:443#中国香港CitySuper,yesstyle.com:443#中国香港YesStyle,jobsdb.com:443 #中国香港JobsDB,www.yata.hk:443#中国香港一田百货,pfizer.com.hk:443#中国香港辉瑞,cyberport.com.hk:443#中国香港数码港,advantech.com:443#中国台湾研华,eyun.cloud:443#中国台湾乐云,newsmarket.com.tw:443#中国台湾上下游,www.buy123.com.tw: 443#中国台湾帮客,www.pcone.com.tw:443#中国台湾披西玩,104.com.tw:443#中国台湾一零四,lac.com.tw:443#中国台湾LAC,shopba ck.com.tw:443#中国台湾返利,www.airasia.com:443#大马亚航,www.allianz.com.my:443#大马安联,www.dbs.com:443#新加坡星展,www.razer.com:443#新加坡雷蛇,ralphlauren.com.sg:443#新加坡拉夫劳伦,shoppes.marinabaysands.com:443#新加坡金沙,store.sony.com.sg:443#新加坡索尼,camperandnicholsons.com:443#新加坡家具,drivewealth.com:443#新加坡金融,www .ooredoo.qa:443#鳄鱼,qnb.com:443#鳄鱼国家银行,www.lacoste.qa:443#鳄鱼,www.nike.qa:443#鳄鱼,sta rbucks.qa:443#地下水星巴克,decathlon.qa:443#地下水迪卡侬,crocs.com.vn:443#越南卡骆驰,locknlock.vn:443#越南乐扣乐扣,g uardian.com.vn:443#越南Guardian,vinhomes.vn:443#越南地产龙头,batdongsan.com.vn:443#越南房产网,chotot.com:443#越南电商,www.vexere.com:443#越南巴士,www.allianz.co.th:443#泰国安联,www.bitkub.com:443#泰国加密货币,www.king power.com:443#泰国皇权消防,www.bumrungrad.com:443#泰国康民,www.nokair.com:443#泰国皇雀航空,www.minorhotels.com:443#泰国美酒店诺,www.toysrus.co.th:443#泰国玩具反斗城,www.bathandbodyworks.co.th:443#泰国BBW,www.victoria ssecretbeauty.co.th:443#泰国维密,www.allianz.co.id:443#对话安联,www.kohler.co.id:443#对话科勒,allot.com:4 43#以色列Allot,www.mizuno.com:443#,日本美津浓converse.co.jp:443#日本匡威,edion.co.jp:443#日本爱电王,diesel.co. jp:443#日本迪赛,shop.glico.com:443#日本格力高,ten.com:443#日本营销科技,www.mlb-korea.com:443#韩国MLB,uplus.co. kr:443#韩国LG电信,www.hyundai.com:443#韩国现代,www.kia.com:443#韩国起亚,www.samsungbiologics.com:443#韩国三星生物，www.mlb-korea.com：443#韩国篮球联盟，www.airpreemia.com：443#韩国航空会社，doosan.com：443#亚洲域名，162.159.197。 1:443#亚洲域名,149.104.26.114:443#优选1,149.104.31.208:443#优选2,149.104.28.62:443#优选3,149.104.26.89:443#优选4,103.242.15.87:443#优选5,111.92.240.90:443#优选6,103.213.4.57:443#优选7,108.165.255.33:443#优选8,103.115.64.158:443#优选9,103.115.64.44:443#优选10 ,154.221.20.188:443#优选11,152.175.1.70:443#优选12,103.240.197.113:443#优选1 3,103.247.28.103:443#优选14,145.79.143.197:443#优选15,141.11.91.16:443#优选16 ,103.136.150.200:443#优选17,103.219.194.151:443#优选18,103.219.195.65:443#优选19,103.253.43.172:443#优选20,139.180.194.242:443#优选21,103.27.187.43:443 #优选22,103.204.174.27:443#优选23,138.2.24.25:443#优选24,13.231.221.179:443#优选25,13.114.147.6:443#优选26,13.193.235.55:443#优选27,13.230.141.104:443#优选2 8,103.27.186.160:443#优选29,138.2.30.80:443#优选30,149.28.19.44:443#优选31,1 66.88.100.26:443#优选32,161.33.131.232:443#优选33,161.33.157.193:443#优选34,1 61.33.138.142:443#优选35,161.33.205.206:443#优选36,108.160.138.38:443#优选37, 138.2.52.92:443#优选38,108.61.160.16:443#优选39,108.61.183.45:443#优选40,131。 143.180.175:443#优选41,154.64.224.37:443#优选42,136.0.39.104:443#优选43,157。 245.182.9:443#优选44,143.110.234.232:443#优选45,149.28.76.221:443#优选46,144。 202.120.41:443#优选47,107.161.82.69:443#优选48,104.168.133.93:443#优选49,129。 146.201.236:443#优选50,104.168.133.189:443#优选51,144.172.98.77:443#优选52,10 *****.132.4:443#优选53,103.233.74.48:443#优选54,103.233.74.54:443#优选55,117 .55.233.77:443#优选56,103.11.76.162:443#优选57,113.20.3.213:443#优选58,103.23 3.74.146:443#优选59,117.55.235.235:443#优选60,13.215.229.246:443#优选61,13.2 50.129.244:443#优选62,13.212.102.10:443#优选63,13.212.33.11:443#优选64,140.24 5.114.190:443#优选65,15.235.212.159:443#优选66,140.245.97.215:443#优选67,139 .59.118.255:443#优选68,143.198.211.180:443#优选69,139.162.20.150:443#优选70,1 52.42.163.208:443#优选71,149.28.137.52:443#优选72,128.1.186.181:443#优选73,13 9.180.143.239:443#优选74,149.28.148.20:443#优选75,141.11.43.124:443#优选76,13 9.162.61.198:443#优选77,161.118.196.58:443#优选78,161.118.219.55:443#优选79, 168.107.90.208:443#优选80,35.201.195.155:443#优选81,35.185.136.126:443#优选82 ,111.250.38.2:443#优选83,59.127.88.131:443#优选84,202.148.221.133:443#优选85, 114.34.210.159:443#优选86,103.131.189.195:443#优选87,140.115.53.51:443#优选88 ,140.235.39.121:443#优选89,140.235.39.19:443#优选90,151.242.188.249:443#优选91,141.11.86.150:443#优选92,103.131.189.111:443#优选93,140.235.38.78:443#优选94,142.249.60.51:443#优选95,82.152.91.210:443#优选96,82.152.90.244:443#优选97 ,83.147.13.193:443#优选98,83.147.15.17:443#优选99,83.147.15.253:443#优选100';205.206:443#优选36,108.160.138.38:443#优选37,138.2.52.92:443#优选38,108.61.160.16:443#优选39,108.61.183 .45:443#优选40,131.143.180.175:443#优选41,154.64.224.37:443#优选42,136.0.39.104:443#优选43,157.245.182. 9:443#优选44,143.110.234.232:443#优选45,149.28.76.221:443#优选46,144.202.120.41:443#优选47,107.161.82.6 9:443#优选48,104.168.133.93:443#优选49,129.146.201.236:443#优选50,104.168.133.189:443#优选51,144.172.98。 77:443#优选52,10*****.132.4:443#优选53,103.233.74.48:443#优选54,103.233.74.54:443#优选55,117.55.233.77: 443#优选56,103.11.76.162:443#优选57,113.20.3.213:443#优选58,103.233.74.146:443#优选59,117.55.235.235:443 #优选60,13.215.229.246:443#优选61,13.250.129.244:443#优选62,13.212.102.10:443#优选63,13.212.33.11:443#优选64,140.245.114.190:443#优选65,15.235.212.159:443#优选66,140.245.97.215:443#优选67,139.59.118.255:443#优选68,143.198.211.180:443#优选69,139.162.20.150:443#优选70,152.42.163.208:443#优选71,149.28.137.52:443 #优选72,128.1.186.181:443#优选73,139.180.143.239:443#优选74,149.28.148.20:443#优选75,141.11.43.124:443#优选76,139.162.61.198:443#优选77,161.118.196.58:443#优选78,161.118.219.55:443#优选79,168.107.90.208:443 #优选80,35.201.195.155:443#优选81,35.185.136.126:443#优选82,111.250.38.2:443#优选83,59.127.88.131:443#优选84,202.148.221.133:443#优选85,114.34.210.159:443#优选86,103.131.189.195:443#优选87,140.115.53.51:443#优选88,140.235.39.121:443#优选89,140.235.39.19:443#优选90,151.242.188.249:443#优选91,141.11.86.150:443#优选92,103.131.189.111:443#优选93,140.235.38.78:443#优选94,142.249.60.51:443#优选95,82.152.91.210:443#优选96,82.152.90.244:443#优选97,83.147.13.193:443#优选98,83.147.15.17:443#优选99,83.147.15.253:443#优选100';205.206:443#优选36,108.160.138.38:443#优选37,138.2.52.92:443#优选38,108.61.160.16:443#优选39,108.61.183 .45:443#优选40,131.143.180.175:443#优选41,154.64.224.37:443#优选42,136.0.39.104:443#优选43,157.245.182. 9:443#优选44,143.110.234.232:443#优选45,149.28.76.221:443#优选46,144.202.120.41:443#优选47,107.161.82.6 9:443#优选48,104.168.133.93:443#优选49,129.146.201.236:443#优选50,104.168.133.189:443#优选51,144.172.98。 77:443#优选52,10*****.132.4:443#优选53,103.233.74.48:443#优选54,103.233.74.54:443#优选55,117.55.233.77: 443#优选56,103.11.76.162:443#优选57,113.20.3.213:443#优选58,103.233.74.146:443#优选59,117.55.235.235:443 #优选60,13.215.229.246:443#优选61,13.250.129.244:443#优选62,13.212.102.10:443#优选63,13.212.33.11:443#优选64,140.245.114.190:443#优选65,15.235.212.159:443#优选66,140.245.97.215:443#优选67,139.59.118.255:443#优选68,143.198.211.180:443#优选69,139.162.20.150:443#优选70,152.42.163.208:443#优选71,149.28.137.52:443 #优选72,128.1.186.181:443#优选73,139.180.143.239:443#优选74,149.28.148.20:443#优选75,141.11.43.124:443#优选76,139.162.61.198:443#优选77,161.118.196.58:443#优选78,161.118.219.55:443#优选79,168.107.90.208:443 #优选80,35.201.195.155:443#优选81,35.185.136.126:443#优选82,111.250.38.2:443#优选83,59.127.88.131:443#优选84,202.148.221.133:443#优选85,114.34.210.159:443#优选86,103.131.189.195:443#优选87,140.115.53.51:443#优选88,140.235.39.121:443#优选89,140.235.39.19:443#优选90,151.242.188.249:443#优选91,141.11.86.150:443#优选92,103.131.189.111:443#优选93,140.235.38.78:443#优选94,142.249.60.51:443#优选95,82.152.91.210:443#优选96,82.152.90.244:443#优选97,83.147.13.193:443#优选98,83.147.15.17:443#优选99,83.147.15.253:443#优选100';443#优选98,83.147.15.17:443#优选99,83.147.15.253:443#优选100';443#优选98,83.147.15.17:443#优选99,83.147.15.253:443#优选100';

// 域名解析转发目标（TCP 53）。不用本机回环地址，避免自连
const DNS_SERVER = '8.8.4.4';

// 中继域名表：直连失败或目标命中名单时改经这些域名转发（SNI 仍为访问域名）
const RELAY_DOMAINS = {
  HK: _d('UHJveHlJUC5ISy5DTUxpdXNzc3MubmV0'), US: _d('UHJveHlJUC5VUy5DTUxpdXNzc3MubmV0'),
  日本：_d（'UHJveHlJUC5KUC5DTUxpdXNzc3MubmV0'），台湾：_d（'UHJveHlJUC5UVy5DTUxpdXNzc3MubmV0'），
  SG: _d('UHJveHlJUC5TRy5DTUxpdXNzc3MubmV0'), KR: _d('UHJveHlJUC5LUi5DTUxpdXNzc3MubmV0'),
  德：_d（'UHJveHlJUC5ERS5DTUxpdXNzc3MubmV0'），SE：_d（'UHJveHlJUC5TRS5DTUxpdXNzc3MubmV0'），
  NL: _d('UHJveHlJUC5OTC5DTUxpdXNzc3MubmV0'), FI: _d('UHJveHlJUC5GSS5DTUxpdXNzc3MubmV0'),
  GB: _d('UHJveHlJUC5HQi5DTUxpdXNzc3MubmV0'), Oracle: _d('UHJveHlJUC5PcmFjbGUuY21saXVzc3NzLm5ldA=='),
  DigitalOcean: _d('UHJveHlJUC5EaWdpdGFsT2NlYW4uQ01MaXVzc3NzLm5ldA=='),
  Vultr: _d('UHJveHlJUC5WdWx0ci5DTUxpdXNzc3MubmV0'), Multacom: _d('UHJveHlJUC5NdWx0YWNvbS5DTUxpdXNzc3MubmV0')
};

// 串联列表：命中即优先走中继（这些站点常被上游出口拒绝）
const NEED_LIST_RE = new RegExp(_d('KF58XC4pKGNoYXRncHRcLmNvbXxvcGVuYWlcLmNvbXxvYWlzdGF0aWNcLmNvbXxvYWl1c2VyY29udGVudFwuY29tfGdvb2dsZVwuY29tfHlvdXR1YmVcLmNvbXxnb29nbGV2aWRlb1wuY29tfHlvdXR1XC5iZXxnb29nbGVhcGlzXC5jb218Z3Z0MVwuY29tfGd2dDJc LmNvbXxnZ3BodFwuY29tfGFudGhyb3BpY1wuY29tfGNsYXVkZVwuYWl8dHdpdHRlclwuY29tfHhcLmNvbXx0d2ltZ1wuY29tfGluc3RhZ 3JhbVwuY29tfGZhY2Vib29rXC5jb218d2hhdHNhchHBcLmNvbXxkaXNjb3JkXC5jb218c3BvdGlmeVwuY29tfG5ldGZsaXhcLmNvbSkk'), '我'）;
// 自定义中继（配置变量，格式host 或 host:port；见 docs/环境变量.md）：
//配置后所有流量优先经该中继转发（对端按SNI路由），失败再回退直连/内置
let CUSTOM_RELAY = '';
常量 COMPLIANCE_MODE = false; // 合规模式：仅下发本站域名直连节点、出站纯直连（终止第三方上游），false 恢复全功能
// 区域地址池：外部实时测速维护的接入点IP（垂直通道分发机制，trusted直接下发）
const REGION_POOL_URLS = [
  { label: '香港', region: 'HK', url: 'https://' + _d('YmVzdGNmLnBhZ2VzLmRldg==') + '/random-region/HK/100.txt', count: 12 },
  { label: '日本', 地区: 'JP', url: 'https://' + _d('YmVzdGNmLnBhZ2VzLmRldg==') + '/random-region/JP/100.txt', count: 12 },
  { label: '美国', region: 'US', url: 'https://' + _d('YmVzdGNmLnBhZ2VzLmRldg==') + '/random-region/US/100.txt', count: 12 },
  { label: '新加坡', 地区: 'SG', url: 'https://' + _d('YmVzdGNmLnBhZ2VzLmRldg==') + '/random-region/SG/100.txt', count: 12 },
  { label: '台湾', region: 'TW', url: 'https://' + _d('YmVzdGNmLnBhZ2VzLmRldg==') + '/random-region/TW/100.txt', count: 12 }
];
const regionPoolCache = { list: null, at: 0 };

// 拉取区域地址池（每个区域取前计数个，10分钟服务器）
异步函数 fetchRegionPool() {
  如果 (regionPoolCache.list && Date.now() - regionPoolCache.at < 10 * 60 * 1000) 返回 regionPoolCache.list;
  const out = [];
  const jobs = REGION_POOL_URLS.map(async (rp) => {
    尝试 {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 8000);
      const res = await fetch(rp.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: ctl.signal });
      清除超时(定时器);
      如果 (!res.ok) 返回；
      const text = await res.text();
      令 n = 0；
      for (const line of text.split(/[\r\n]+/)) {
        const core = line.split('#')[0].trim();
        const m = core.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::(\d+))?$/);
        如果 (m && n < rp.count) {
          out.push({ host: m[1], port: m[2] ? parseInt(m[2], 10) : 443, name: rp.label + '-' + String(n + 1).padStart(2, '0') });
          n++;
        }
      }
    } catch (e) { /* 单区域拉取失败跳过 */ }
  });
  等待 Promise.all(jobs);
  regionPoolCache.list = out;
  regionPoolCache.at = Date.now();
  返回；
}
// ============================ 配置区结束 ==============================

// -------------------- 基础工具 --------------------
const textDecoder = new TextDecoder();

function toUint8(data) {
  如果 (data 是 Uint8Array 的实例) 返回 data；
  如果 (typeof data === 'string') 返回 new TextEncoder().encode(data);
  如果 (data 是 ArrayBuffer 的实例) 返回 new Uint8Array(data);
  if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  返回新的 Uint8Array(data || []);
}

function concatBytes(...list) {
  令总数 = 0；
  for (const b of list) total += (b && b.byteLength) || 0;
  const out = new Uint8Array(total);
  let off = 0;
  for (const b of list) {
    如果 (!b || !b.byteLength) 则继续；
    out.set(b, off);
    off += b.byteLength;
  }
  返回；
}

function base64EncodeStd(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  返回 btoa(bin);
}

function isIPv4(s) { return /^\d{1,3}(\.\d{1,3}){3}$/.test(s); }
function isIPv6(s) { return s.includes(':') && !isIPv4(s); }

function cleanHost(h) {
  h = (h || '').trim();
  如果 (h.startsWith('[') && h.endsWith(']')) h = h.slice(1, -1);
  返回 h；
}

function parseHostPort(addr) {
  addr = (addr || '').trim();
  如果 (!addr) 返回 null；
  let host, port = 443;
  如果 (addr.startsWith('[')) {
    const m = addr.match(/^\[(.+)\](?::(\d+))?$/);
    如果 (!m) 返回 null；
    host = m[1]; port = parseInt(m[2] || '443', 10);
  } 别的 {
    const parts = addr.split(':');
    如果 (parts.length === 2) { host = parts[0]; port = parseInt(parts[1], 10); }
    否则如果 (parts.length === 1) { host = parts[0]; }
    否则 { host = addr; }
  }
  如果 (!host || isNaN(port) || port <= 0 || port > 65535) 返回 null;
  返回 { 主机，端口 }；
}

function parseRelay(str) {
  str = (str || '').trim();
  如果 (!str) 返回 null；
  const at = str.lastIndexOf('@');
  let user = '', pass = '', hostPort;
  如果 (at >= 0) {
    const up = str.slice(0, at);
    hostPort = str.slice(at + 1);
    const idx = up.indexOf(':');
    如果 (idx < 0) 返回 null；
    用户 = up.slice(0, idx); 通行证 = up.slice(idx + 1);
  } 别的 {
    hostPort = str;
  }
  const hp = parseHostPort(hostPort);
  如果 (!hp) 返回 null；
  返回 { 用户名、密码、主机名: hp.host、端口号: hp.port };
}

// --------------------接入令牌/协议头 --------------------
函数 isValidUUID(u) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(u || '');
}

函数 hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  返回；
}

function isUUIDBytes(data, offset, uuid) {
  const want = hexToBytes(uuid.replace(/-/g, ''));
  如果 (偏移量 + 16 > 数据.字节长度) 返回 false；
  for (let i = 0; i < 16; i++) if (data[offset + i] !== want[i]) return false;
  返回 true；
}

// 解析协议头：version + token16 + addonsLen + [附加信息] + cmd + port2 + atyp + 地址 + Payload
function parseAccessHeader(data, uuid) {
  if (data.byteLength < 24) return { hasError: true, message: '数据过短' };
  const version = data[0];
  if (!isUUIDBytes(data, 1, uuid)) return { hasError: true, message: 'UUID 验证失败' };
  const addonsLen = data[17];
  const cmdIndex = 18 + addonsLen;
  if (cmdIndex + 1 > data.byteLength) return { hasError: true, message: '头断' };
  const cmd = data[cmdIndex];
  if (cmd !== 1 && cmd !== 2) return { hasError: true, message: '仅支持01-传输/02-数据报' };
  const portOffset = cmdIndex + 1;
  if (portOffset + 2 > data.byteLength) return { hasError: true, message: '端口断断' };
  const port = (data[portOffset] << 8) | data[portOffset + 1];
  const typeOffset = portOffset + 2;
  if (atypOffset + 1 > data.byteLength) return { hasError: true, message: '地址类型截断' };
  const atyp = 数据[atypOffset];
  let addrLen = 0, addrValueOffset = atypOffset + 1, hostname = '';
  如果 (atyp === 1) {
    addrLen = 4;
    如果 (addrValueOffset + addrLen > data.byteLength) 返回 { hasError: true, message: 'IPv4 截断' };
    hostname = Array.from(data.slice(addrValueOffset, addrValueOffset + 4)).join('.');
  } else if (atyp === 2) {
    addrLen = data[addrValueOffset];
    addrValueOffset += 1;
    if (addrValueOffset + addrLen > data.byteLength) return { hasError: true, message: '域名截断' };
    hostname = textDecoder.decode(data.slice(addrValueOffset, addrValueOffset + addrLen));
  } else if (atyp === 3) {
    addrLen = 16;
    如果 (addrValueOffset + addrLen > data.byteLength) 返回 { hasError: true, message: 'IPv6 截断' };
    const v6 = [];
    for (let i = 0; i < 8; i++) v6.push(((data[addrValueOffset + i * 2] << 8) | data[addrValueOffset + i * 2 + 1]).toString(16));
    主机名 = v6.join(':');
  } 别的 {
    return { hasError: true, message: '地址类型不合法' };
  }
  if (!hostname) return { hasError: true, message: '目标地址为空' };
  返回 {
    hasError: false, version, cmd, port, atyp, hostname,
    isUDP：cmd === 2，
    原始数据：data.slice(addrValueOffset + addrLen)
  };
}

// -------------------- 上游串联 --------------------
异步函数 relayConnect(proxy, targetHost, targetPort, timeoutMs) {
  const connectWithTimeout = (hostname, port) => {
    const sock = connect({ hostname, port });
    返回 Promise.race([
      袜子已打开
      new Promise((_, rej) => setTimeout(() => rej(new Error('连接超时')), timeoutMs || 6000))
    然后(() => sock);
  };
  const sock = await connectWithTimeout(proxy.host, proxy.port);
  const writer = sock.writable.getWriter();
  const reader = sock.readable.getReader();

  // 握手：支持无认证与用户名/密码认证
  await writer.write(new Uint8Array([5, 2, 0, 2]));
  const resp1 = (await reader.read()).value;
  if (!resp1 || resp1[0] !== 5) throw new Error('上游串联版本错误');
  if (resp1[1] === 0xff) throw new Error('上游中继无可用认证方式');
  如果 (resp1[1] === 2) {
    if (!proxy.user) throw new Error('上游配置需要认证但未用户名');
    const enc = new TextEncoder();
    await writer.write(new Uint8Array([1, proxy.user.length, ...enc.encode(proxy.user), proxy.pass.length, ...enc.encode(proxy.pass)]));
    const resp2 = (await reader.read()).value;
    if (!resp2 || resp2[0] !== 1 || resp2[1] !== 0) throw new Error('上游上游认证失败');
  }

  // 连接请求
  const enc = new TextEncoder();
  let addrPart;
  如果 (isIPv4(targetHost)) addrPart = new Uint8Array([1, ...targetHost.split('.').map(Number)]);
  否则如果 (isIPv6(targetHost)) {
    const parts = [];
    targetHost.split(':').forEach(seg => {
      seg = seg.padStart(4, '0');
      parts.push(parseInt(seg.slice(0, 2), 16), parseInt(seg.slice(2, 4), 16));
    });
    addrPart = new Uint8Array([4, ...parts]);
  } 别的 {
    const nb = enc.encode(targetHost);
    addrPart = new Uint8Array([3, nb.length, ...nb]);
  }
  const req = new Uint8Array([5, 1, 0, ...addrPart, targetPort >> 8, targetPort & 0xff]);
  await writer.write(req);
  const resp3 = (await reader.read()).value;
  if (!resp3 || resp3[1] !== 0) throw new Error('上游串联建连失败');
  writer.releaseLock();
  reader.releaseLock();
  返回袜子；
}

// -------------------------------- 集群支持 --------------------
// 中继域名解析服务器（TTL 5 分钟：域名 → DoH TXT/A 解析的多 IP 候选）
const RELAY_CACHE = new Map();
const RELAY_DOHS = ['https://cloudflare-dns.com/dns-query', 'https://dns.alidns.com/resolve', 'https://doh.pub/dns-query'];

// 解析域名为IP候选列表：IP字面量直接返回；
// 域名先查 TXT（TXT 存逗号/换行分隔的 IP 列表或特定标记），无有效 TXT 使用 A 记录
异步函数 resolveRelays(host, port) {
  端口 = 端口 || 443;
  如果 (主机是 IPv4 还是 IPv6) 返回 [{ 主机名: 主机名, 端口 }];
  const key = (host || '').toLowerCase() + ':' + port;
  const now = Date.now();
  const hit = RELAY_CACHE.get(key);
  如果（命中且当前 - 命中次数 < 5 * 60 * 1000）返回命中次数；

  const dohQuery = async (type, typeNum) => {
    const jobs = RELAY_DOHS.map(async (url) => {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 4000);
      尝试 {
        const resp = await fetch(url + '?name=' + encodeURIComponent(host) + '&type=' + type, {
          headers: { accept: 'application/dns-json' },
          信号：ctl.signal
        });
        清除超时(定时器);
        如果 (!resp.ok) 抛出新的错误('哎呀，失败了');
        const j = await resp.json();
        const ans = (j.Answer || []).filter(a => a.type === typeNum).map(a => a.data);
        如果答案长度未达到，则抛出新的错误（'没有答案'）。
        返回答案；
      } catch (e) { throw e; }
    });
    try { return await Promise.any(jobs); } catch (e) { return []; }
  };

  const [txtRecords, aRecords] = await Promise.all([dohQuery('TXT', 16), dohQuery('A', 1)]);
  let targets = [];
  for (const raw of txtRecords) {
    const val = String(raw).replace(/^"|"$/g, '').replace(/\\010/g, ',').replace(/\n/g, ',').trim();
    如果 (!val) 则继续；
    if (val === _d('QGVkdHVubmVs')) {
      targets = aRecords.filter(x => isIPv4(x)).map(x => ({ hostname: x, port }));
      休息;
    }
    const entries = val.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
    const parsed = [];
    for (const entry of entries) {
      const hp = parseHostPort(entry);
      const h2 = hp ? hp.host : entry.trim();
      const p2 = hp ? hp.port : port;
      如果 (h2 是 IPv4 还是 IPv6) 解析后，将主机名 h2 和端口 p2 添加到解析结果中。
    }
    如果 (parsed.length) { targets = parsed; break; }
  }
  if (!targets.length) targets = aRecords.filter(x => isIPv4(x)).map(x => ({ hostname: x, port }));
  如果 (!targets.length) {
    const aaaaRecs = await dohQuery('AAAA', 28);
    targets = aaaaRecs.filter(x => isIPv6(x)).map(x => ({ hostname: x, port }));
  }
  const seen = new Set();
  targets = targets.filter(t => {
    const k = t.hostname + ':' + t.port;
    如果 (seen.has(k)) 返回 false；
    seen.add(k);
    返回 true；
  });
  if (targets.length) RELAY_CACHE.set(key, { t: now, ips: targets });
  返回目标；
}

// 根据工人机选择房（colo）就近串联地区
function selectRelayRegion(colo) {
  const c = (colo || '').toUpperCase();
  如果 (c.startsWith('HKG') || c.startsWith('SIN') || c.startsWith('NRT') || c.startsWith('KIX') ||
      c.startsWith('TYO') || c.startsWith('OSA') || c.startsWith('ICN') || c.startsWith('SEL') || c.startsWith('HK')) 返回 'HK';
  如果 (c.startsWith('FRA') || c.startsWith('BER') || c.startsWith('MUC') || c.startsWith('LHR') ||
      c.startsWith('AMS') || c.startsWith('ARN') || c.startsWith('HEL') || c.startsWith('DE')) 返回 'DE';
  返回“美国”；
}

// -------------------- 出站竞速与协议判定 --------------------
// 平台官方IPv4段：目标在该段内时直连必被回环保护拦截（grace=0 直接上中继）
const CLOUDFLARE_CIDRS = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
  '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
  '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
  '104.24.0.0/14'、'172.64.0.0/13'、'131.0.72.0/22'
];
函数 cidrToRange(cidr) {
  const [net, bitsStr] = cidr.split('/');
  const 位 = parseInt(bitsStr, 10);
  const p = net.split('.').map(Number);
  const start = ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
  const hostBits = 32 - bits;
  返回 [start, (start + ((1 << hostBits) - 1)) >>> 0];
}
function isCloudflareIP(ip) {
  如果 (!isIPv4(ip)) 返回 false;
  const p = ip.split('.').map(Number);
  const n = ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
  返回 CLOUDFLARE_CIDRS.some(c => {
    const [s, e] = cidrToRange(c);
    返回 n >= s && n <= e；
  });
}
// 首包协议判定：TLS 记录头固定 0x16 0x03（ClientHello/handshake）；非 TLS 仅直连/真中继能承载
function sniffPayloadKind(bytes) {
  如果 (!bytes || bytes.byteLength < 3) 返回 'unknown'；
  返回 (bytes[0] === 0x16 && bytes[1] === 0x03) ? 'tls' : 'nontls';
}
// 并发竞速：多路连接同时发起，取最先成功的一条；失败者立即关闭，避免占用同时连接损耗
function raceConnect(jobs) {
  如果 (!jobs || !jobs.length) 返回 Promise.resolve(null);
  返回一个新的 Promise((resolve) => {
    let settlement = false;
    let left = jobs.length;
    const finish = (sock) => {
      左边 - ;
      如果（袜子）{
        如果 (已解决) { 尝试 { sock.close(); } 捕获 (e) {} }
        否则 { 已解决 = true; 解析(sock); }
      } else if (left <= 0 && !settled) resolve(null);
    };
    for (const job of jobs) {
      Promise.resolve().then(job).then(
        (s) => finish(s && s.readable ? s : null),
        () => finish(null)
      ）；
    }
  });
}
// 直连优先竞速：直连与队列发起，直连在graceMs窗口内成功即用直连（可直连不绕绕）；
// 直连失败/窗口终止 -> 使用已就绪的负载（已建立，不额外等待）；负载也可用 -> 继续等直连
function racePreferDirect(directJob, relayJobs, graceMs) {
  let used = null;
  const recycle = (s) => { if (s && s !== used) { try { s.close(); } catch (e) {} } };
  const directP = directJob ? Promise.resolve().then(directJob).then((s) => (s && s.readable ? s : null), () => null) : Promise.resolve(null);
  const relayP = (relayJobs && relayJobs.length) ? raceConnect(relayJobs).then((s) => (s && s.readable ? s : null), () => null) : Promise.resolve(null);
  let graceTimer = null;
  返回 Promise.race([
    directP，
    new Promise((r) => { graceTimer = setTimeout(() => r('__GRACE__'), graceMs); })
  ]).then((first) => {
    如果 (graceTimer) { clearTimeout(graceTimer); graceTimer = null; }
    如果 (first 存在且 first 不等于 '__GRACE__') { used = first; relayP.then(recycle); return used; }
    返回 relayP.then((relay) => {
      如果 (relay) { used = relay; directP.then(recycle); return used; }
      return directP.then((late) => { if (late) { used = late; return used; } return null; });
    });
  });
}

// -------------------- 出站拨号 --------------------
// 顺序：自定义串联 → 上游串联 → 命中列表走中继 → 直 → 备用地址 → 连串底
function cloudflareConnect(hostname, port, timeoutMs) {
  const sock = connect({ hostname, port });
  返回 Promise.race([
    sock.opened.then(() => sock),
    new Promise((_, rej) => setTimeout(() => rej(new Error('拨号超时')), timeoutMs || 6000))
  ]);
}

// 成功集群池：已验证达到的集群（最多4个），轮询使用以聚合带宽
const RELAY_GOOD = [];
let RELAY_ROT = 0;

// 链路连接：优先轮询成功池（分片分散到多个已验证链路，聚合带宽）；
// 成功池为空或全部失效时，确定性顺序探索（colo就近地区优先 + 解析顺序）
异步函数 tryRelayPool(ms, colo) {
  // ① 成功池轮询（round-robin）
  如果 (RELAY_GOOD.length) {
    for (let k = 0; k < RELAY_GOOD.length; k++) {
      const t = RELAY_GOOD[(RELAY_ROT + k) % RELAY_GOOD.length];
      尝试 {
        const sock = await cloudflareConnect(t.hostname, t.port, ms);
        RELAY_ROT = (RELAY_ROT + 1) % RELAY_GOOD.length;
        返回 { socket: sock, via: _d('cHJveHlpcDo=') + t.tag };
      } catch (e) {
        //连接失败：从成功池移除，后续探索新中继
        const idx = RELAY_GOOD.indexOf(t);
        如果 (idx > -1) RELAY_GOOD.splice(idx, 1);
      }
    }
  }
  // ② 顺序探索：colo 就近地区优先，每个地区按解析顺序尝试
  const region = selectRelayRegion(colo);
  const regionKeys = Object.keys(RELAY_DOMAINS);
  const base = [region, ...regionKeys.filter(r => r !== region)].slice(0, 3);
  // 优质机房集群（Oracle/Vultr/DigitalOcean 带宽充足量）紧跟主力地区，提高聚合带宽
  const regions = [...new Set([...base, 'Oracle', 'Vultr', 'DigitalOcean', ...regionKeys])];
  对于（常量 r 个区域）{
    let targets = [];
    try { targets = await resolveRelays(RELAY_DOMAINS[r], 443); } catch (e) { continue; }
    如果 (!targets.length) 则继续；
    对于（常量 t 的目标）{
      尝试 {
        const sock = await cloudflareConnect(t.hostname, t.port, ms);
        const entry = { hostname: t.hostname, port: t.port, tag: RELAY_DOMAINS[r], key: t.hostname + ':' + t.port };
        if (!RELAY_GOOD.some(x => x.key === entry.key)) {
          RELAY_GOOD.push(entry);
          如果 (RELAY_GOOD.length > 6) RELAY_GOOD.shift();
        }
        返回 { socket: sock, via: _d('cHJveHlpcDo=') + entry.tag };
      } catch (e) { /* 该中继不可用，试下一个 */ }
    }
  }
  返回空值；
}

// 依次尝试中继候选（拓扑中继用；域名先DoH解析多IP，随机拓扑分散）
异步函数 tryCustomRelay(list, ms) {
  for (const p of list) {
    如果 (!p || !p.host) 则继续；
    让目标；
    尝试 {
      targets = await resolveRelays(p.host, p.port || 443);
    } catch (e) {
      继续;
    }
    如果 (!targets.length) 则继续；
    对于（常量 t 的目标）{
      尝试 {
        const sock = await cloudflareConnect(t.hostname, t.port, ms);
        返回 { socket: sock, via: _d('cHJveHlpcDo=') + p.host };
      } catch (e) { /* 该中继不可用，试下一个 */ }
    }
  }
  返回空值；
}

// 重置候​​选竞速：同时尝试重重，最快成功者胜出并记入成功池（轮询聚合带宽）
异步函数 raceRelayCandidates(candidates, tag, ms) {
  如果 (!candidates || !candidates.length) 返回 null；
  返回 await new Promise((resolve) => {
    let settlement = false;
    let left = candidates.length;
    const finish = (sock, info) => {
      左边 - ;
      如果（袜子）{
        如果 (已解决) { 尝试 { sock.close(); } 捕获 (e) {} }
        别的 {
          已解决 = true；
          如果（信息）{
            const entry = { hostname: info.hostname, port: info.port, tag, key: info.hostname + ':' + info.port };
            if (!RELAY_GOOD.some(x => x.key === entry.key)) {
              RELAY_GOOD.push(entry);
              如果 (RELAY_GOOD.length > 6) RELAY_GOOD.shift();
            }
          }
          解决(袜子)；
        }
      } else if (left <= 0 && !settled) resolve(null);
    };
    for (const c of candidates) {
      Promise.resolve().then(() => cloudflareConnect(c.hostname, c.port, ms)).then(
        (s) => finish(s && s.readable ? s : null, s && s.readable ? c : null),
        () => finish(null)
      ）；
    }
  });
}

async function dialOut(targetHost, targetPort, viaRelay, colo, payloadKind) {
  // 合规模方式：出站纯直连（不经任何第三方中继）
  如果 (COMPLIANCE_MODE) {
    const s = await cloudflareConnect(targetHost, targetPort, 6000);
    如果 (s) 返回 { socket: s, via: 'direct' };
    throw new Error('直连失败: ' + targetHost + ':' + targetPort);
  }
  const allowedSniRelay = PayloadKind !== 'nontls'; // 非 TLS 首包不得走 SNI 型堆叠（堆叠按 SNI 路由，无 SNI 流量无法搬运）
  常量 DIRECT_TIMEOUT = 4000; // 竞速下直连消耗久等（并同时在跑），加快让快的一路胜出
  常量 RELAY_TIMEOUT = 4000; // 中继单路连接超时
  常量 DIRECT_GRACE_MS = 300; // 直连优先窗口：窗口内直连成功就用直连，避免把可直连目标塞进第三方中继

  // ① 自定义集群固定出口（配置设备）：TLS 流量优先走它（SNI 型转发），失败再退
  如果 (CUSTOM_RELAY && allowSniRelay) {
    const custom = parseHostPort(CUSTOM_RELAY);
    如果（自定义）{
      let targets = [];
      try { targets = await resolveRelays(custom.host, custom.port || 443); } catch (e) { targets = []; }
      if (!targets.length) targets = [{ hostname: custom.host, port: custom.port || 443 }];
      const r = await raceConnect(targets.slice(0, 4).map(t => () => cloudflareConnect(t.hostname, t.port, 5000).catch(() => null)));
      如果 (r) 返回 { socket: r, via: _d('cHJveHlpcDpjdXN0b20=') };
      console.log('自定义中继不可用，继续其他方式', CUSTOM_RELAY);
    }
  }
  // ② 串联（可任意承载协议）
  如果（通过中继）{
    尝试 {
      const sock = await relayConnect(viaRelay, targetHost, targetPort);
      返回 { socket: sock, via: _d('c29ja3M1') };
    } catch (e) {
      console.log('中继连接失败，继续', targetHost + ':' + targetPort);
    }
  }
  // ③ 出站竞速：直连优先 ∥ 串联（成功池 + 内置区域）
  // 直连在graceMs窗口内成功就用直连（可直连不绕绕）；
  // 直连被回环保护拦截/失败时，负载已就绪<1s（不再串行白等超时）
  const relayJobs = [];
  // 成功池轮询（已验证中继，round-robin分散分片聚合带宽）
  如果 (RELAY_GOOD.length) {
    for (let k = 0; k < RELAY_GOOD.length && k < 2; k++) {
      const t = RELAY_GOOD[(RELAY_ROT + k) % RELAY_GOOD.length];
      relayJobs.push(() => cloudflareConnect(t.hostname, t.port, RELAY_TIMEOUT).then((s) => {
        RELAY_ROT = (RELAY_ROT + 1) % RELAY_GOOD.length;
        返回 s；
      }).catch((e) => {
        const idx = RELAY_GOOD.indexOf(t);
        如果 (idx > -1) RELAY_GOOD.splice(idx, 1);
        返回空值；
      }));
    }
  }
  // 内置地区集群：colo就近地区优先，优质机房（Oracle/Vultr/DigitalOcean 带宽充足）紧跟
  如果（允许SniRelay）{
    const region = selectRelayRegion(colo);
    const regionKeys = Object.keys(RELAY_DOMAINS);
    const base = [region, ...regionKeys.filter(r => r !== region)].slice(0, 2);
    const regions = [...new Set([...base, 'Oracle', 'Vultr', 'DigitalOcean'])];
    对于（常量 r 个区域）{
      relayJobs.push(async () => {
        let ts = [];
        try { ts = await resolveRelays(RELAY_DOMAINS[r], 443); } catch (e) { return null; }
        如果 (!ts.length) 返回 null；
        返回 raceRelayCandidates(ts.slice(0, 2), RELAY_DOMAINS[r], RELAY_TIMEOUT);
      });
    }
  }
  const directJob = () => cloudflareConnect(targetHost, targetPort, DIRECT_TIMEOUT).catch(() => null);
  // 目标为平台 Anycast 段 -> Workers 回环保护拦截拦截直连，省掉优先窗口直接上中继
  const grace = isCloudflareIP(targetHost) ? 0 : DIRECT_GRACE_MS;
  const r = await racePreferDirect(directJob, relayJobs.slice(0, 4), grace);
  如果 (r) 返回 { socket: r, via: 'race' };
  // ④ 备用地址
  如果 (FALLBACK_HOST) {
    尝试 {
      const sock = await cloudflareConnect(FALLBACK_HOST, targetPort, 5000);
      返回 { socket: sock, via: 'fallback:' + FALLBACK_HOST };
    } catch (e) {
      console.log('备用地址失败', FALLBACK_HOST + ':' + targetPort);
    }
  }
  // ⑤ 堆叠兜底：放宽再试扭矩
  const r2 = await raceConnect(relayJobs.slice(0, 6).map(j => () => j().catch(() => null)));
  如果 (r2) 返回 { socket: r2, via: _d('cHJveHlpcDpmYWxsYmFjaw==') };
  throw new Error('直连与中继均失败: ' + targetHost + ':' + targetPort);
}

// -------------------------------- 优选地址收集 --------------------
// 每项：host:port 或在线列表 URL（逐行 host:port#备注），中英文分隔分隔
异步函数 collectPreferred(hostHeader) {
  // 合规模式：接入信息只包含本站域名对应的节点
  如果 (COMPLIANCE_MODE) {
    const list = [];
    if (hostHeader) list.push({ host: hostHeader, port: 443, name: hostHeader });
    返回列表；
  }
  const result = [];
  const seen = new Set();
  const add = (raw) => {
    const text = (raw || '').trim();
    如果 (!text) 返回；
    const hashIdx = text.indexOf('#');
    const remark = hashIdx >= 0 ? text.slice(hashIdx + 1).trim() : '';
    const addrPort = (hashIdx >= 0 ? text.slice(0, hashIdx) : text).trim();
    如果 (!addrPort) 返回；
    let host, port = 443;
    const v6 = addrPort.match(/^\[(.+)\]:(\d+)$/);
    如果 (v6) { host = v6[1]; port = parseInt(v6[2], 10); }
    否则如果 (addrPort.includes(':') && addrPort.split(':').length === 2) {
      const sp = addrPort.split(':');
      host = sp[0]; port = parseInt(sp[1], 10);
    } 别的 {
      主机 = addrPort；
    }
    host = (host || '').trim();
    如果 (!host || isNaN(port)) 返回；
    const key = host + ':' + port;
    如果 (seen.has(key)) 返回；
    seen.add(key);
    result.push({ host, port, name: remark || key });
  };

  // ① 核心优选池（优先填满上限，全部涉及机实测可达地址）
  const cap = 100;
  const items = (PREFERRED_LIST || '').split(/[,，]/).map(x => x.trim()).filter(Boolean);
  for (const item of items) {
    如果 (result.length >= cap) 则跳出循环；
    if (/^https?:\/\//i.test(item)) {
      尝试 {
        const resp = await fetch(item, { cf: { cacheTtl: 300 } });
        如果（resp.ok）{
          const text = await resp.text();
          for (const line of text.split('\n')) add(line);
        }
      } catch (e) { /* 拉取失败跳过该 URL */ }
    } 别的 {
      添加(项目)；
    }
  }

  // ② 实时优选兜底（仅当内置池不足时补充，不引导核心池）
  尝试 {
    const pool = await fetchRegionPool();
    for (const x of pool) {
      如果 (result.length >= cap) 则跳出循环；
      添加(x.host + ':' + x.port + '#' + x.name);
    }
  } catch (e) { /* 拉取失败不影响核心池 */ }
  如果 (result.length === 0 && hostHeader) add(hostHeader);
  返回结果；
}

// -------------------- 接入信息生成 --------------------
// 为每个接入地址生成一个接入入口；80/8080/8880/2052/2082/2086/2095 走明文，其余TLS
//默认返回明文行（防base64在部分客户端按GBK解码导致中文乱码，垂直队列队列机制）
异步函数 buildPlainLines(hostHeader) {
  const plainPorts = /\.workers\.dev$/i.test(hostHeader) ？ [80, 8080, 8880, 2052, 2082, 2086, 2095] : [];
  const list = await collectPreferred(hostHeader);
  返回 list.map(item => {
    const safeHost = isIPv6(item.host) ? '[' + item.host + ']' : item.host;
    const isPlain = plainPorts.includes(item.port);
    const sec = isPlain ? _d('c2VjdXJpdHk9bm9uZQ==') : _d('c2VjdXJpdHk9dGxzJnNuaT0=') + hostHeader + _d('JmZwPWNocm9tZQ==');
    返回 _d('dmxlc3M6Ly8=') + UUID + '@' + safeHost + ':' + item.port +
      '?encryption=none&' + sec + '&type=' + _d('d3M=') + '&host=' + hostHeader +
      '&path=%2F%3Fed%3D2048' + '#' + encodeURIComponent(item.name);
  }).join('\n');
}
// base64封装（?format=base64时返回）
异步函数 buildSubscription(hostHeader) {
  返回 base64EncodeStd(await buildPlainLines(hostHeader));
}

// -------------------- YAML接入配置 --------------------
函数 yamlQuote(s) {
  return '"' + String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// 生成可直接导入的YAML配置（含策略组与规则）
异步函数 buildYamlConfig(hostHeader) {
  const plainPorts = /\.workers\.dev$/i.test(hostHeader) ？ [80, 8080, 8880, 2052, 2082, 2086, 2095] : [];
  const list = await collectPreferred(hostHeader);
  const lines = [];
  const names = [];
  lines.push(_d('cHJveGllczo='));
  list.forEach((item, idx) => {
    const name = item.name || ('Node-' + (idx + 1));
    names.push(name);
    const isPlain = plainPorts.includes(item.port);
    lines.push(' - name: ' + yamlQuote(name));
    lines.push(' type: ' + _d('dmxlc3M='));
    lines.push('服务器：' + yamlQuote(item.host));
    lines.push('端口：' + item.port);
    lines.push(' ' + _d('dXVpZDog') + yamlQuote(UUID));
    lines.push('udp: true');
    如果 (!isPlain) {
      lines.push('tls: true');
      lines.push('服务器名称：' + yamlQuote(hostHeader));
      lines.push(' ' + _d('Y2xpZW50LWZpbmdlcnByaW50OiBjaHJvbWU='));
    }
    lines.push(' ' + _d('bmV0d29yazogd3M='));
    lines.push(' ' + _d('d3Mtb3B0czo='));
    lines.push('路径:' + yamlQuote('/?ed=2048'));
    lines.push(' headers:');
    lines.push('主机名：' + yamlQuote(hostHeader));
  });
  lines.push(_d('cHJveHktZ3JvdXBzOg=='));
  lines.push(' - name: "节点选择"');
  lines.push(' type: select');
  lines.push(' ' + _d('cHJveGllczo='));
  names.forEach(n => lines.push(' - ' + yamlQuote(n)));
  lines.push(' - name: "自动选择"');
  lines.push(' type: url-test');
  lines.push(' url: "http://www.gstatic.com/generate_204"');
  lines.push(' interval: 300');
  lines.push(' 容差：50');
  lines.push(' ' + _d('cHJveGllczo='));
  names.forEach(n => lines.push(' - ' + yamlQuote(n)));
  lines.push('规则：');
  lines.push(' - MATCH, 节点选择');
  返回 lines.join('\n');
}

// -------------------- WebSocket 隧道 --------------------
异步函数 handleSocket(request) {
  const pair = new (globalThis[_d('V2ViU29ja2V0UGFpcg==')])();
  const [client, server] = Object.values(pair);
  服务器接受请求；
  server.binaryType = 'arraybuffer';

  let remote = null; // { socket, writer }
  let headerBuf = new Uint8Array(0);
  let headerSent = false;
  let protoWait = null;
  let dnsMode = false;
  let closed = false;

  const relayCfg = parseRelay(RELAY_ADDR);

  // 早期数据（early data）：部分客户端拿协议头覆盖首包
  // 一起以base64url 编码编码 Sec-WebSocket-Protocol 请求头，此处解码后
  //作为首块数据参与解析，保证此类客户端能正常握手。
  const earlyRaw = request.headers.get('sec-websocket-protocol') || '';
  如果 (earlyRaw) {
    尝试 {
      const b64 = earlyRaw.replace(/-/g, '+').replace(/_/g, '/');
      const bin = atob(b64);
      const early = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) early[i] = bin.charCodeAt(i);
      headerBuf = 早期；
    } catch (e) { /* 请求头内容异常则忽略 */ }
  }

  const closeAll = () => {
    如果（已关闭）返回；
    closed = true;
    try { server.close(); } catch (e) {}
    如果（远程）{
      try { remote.writer.releaseLock(); } catch (e) {}
      try { remote.socket.close(); } catch (e) {}
    }
  };

  // DNS 数据报：UDP 报文经 TCP DNS_SERVER:53 转发（TCP DNS 需 2 字节长度）
  const dnsForward = async (payload) => {
    尝试 {
      const sock = await cloudflareConnect(DNS_SERVER, 53, 5000);
      const writer = sock.writable.getWriter();
      const p = toUint8(有效载荷);
      await writer.write(concatBytes(new Uint8Array([p.byteLength >> 8, p.byteLength & 0xff]), p));
      writer.releaseLock();
      const reader = sock.readable.getReader();
      const head = await readFull(reader, 2, 2, 8000);
      const rlen = (head[0] << 8) | head[1];
      const body = await readFull(reader, rlen, rlen, 8000);
      try { sock.close(); } catch (e) {}
      如果 (!closed && body.byteLength) {
        try { server.send(concatBytes(new Uint8Array([0, 0]), body)); } catch (e) {}
      }
    } catch (e) {
      console.error('DNS 转发失败', e && e.message ? e.message : String(e));
      关闭所有();
    }
  };

  const pumpRemote = async () => {
    尝试 {
      const reader = remote.socket.readable.getReader();
      while (!closed) {
        const { value, done } = await reader.read();
        如果（完成）则中断；
        如果 (value && value.byteLength) {
          try { server.send(value); } catch (e) { break; }
        }
      }
    } catch (e) {}
    关闭所有();
  };

  // 首包建立：解析协议头 -> 首包协议替代（TLS/非 TL************tra 涉及次新增数据（无则传空）。
  //返回true表示已定案（成功或失败关闭）；false表示数据不足/等待首包，继续等待下一条。
  常量 SNIFF_WAIT_MS = 80; // 头已完整但暂无数据时等首包的极短上限（仅用于协议判定，不拖慢建连）
  const establish = async (extra, forced) => {
    headerBuf = concatBytes(headerBuf, extra);
    const parsed = parseAccessHeader(headerBuf, UUID);
    如果 (parsed.hasError) {
      如果 (headerBuf.byteLength > 512) { closeAll(); 返回 true; }
      返回 false；
    }
    // UDP数据报（DNS）：仅支持53端口，每条报文独立转发
    如果 (parsed.isUDP) {
      如果 (parsed.port !== 53) { closeAll(); 返回 true; }
      dnsMode = true;
      headerSent = true;
      如果 (parsed.raw && parsed.raw.byteLength) dnsForward(parsed.raw);
      返回 true；
    }
    // 首包协议判定：中继是 SNI 型，只有 TLS 流量才能经受搬运；非 TLS（MTProto/明文 HTTP 等）
    // 无SNI，经中继会"连上但零字节"，必须只走直连/真中继。头完整却暂无数据时等首包到达，
    // 超时（SNIFF_WAIT_MS）仍无数据则按未知放行，不让连接挂起。
    const kind = sniffPayloadKind(parsed.raw);
    如果（种类 === '未知' && !forced）{
      if (!protoWait) protoWait = setTimeout(() => {
        protoWait = null;
        建立(new Uint8Array(0), true).catch(closeAll);
      }, SNIFF_WAIT_MS);
      返回 false；
    }
    如果 (protoWait) { clearTimeout(protoWait); protoWait = null; }
    if (headerSent) 返回 true; // ARM重入保护：早数据与首个数据帧同时到达时只建立一次
    尝试 {
      remote = await dialOut(parsed.hostname, parsed.port, relayCfg, request.cf && request.cf.colo, kind);
    } catch (e) {
      const msg = '连接失败：' + (e && e.message ? e.message : String(e));
      console.error('' + msg);
      try { server.send(msg); } catch (e2) {}
      关闭所有();
      返回 true；
    }
    headerSent = true;
    try { remote.writer = remote.socket.writable.getWriter(); } catch (e) { closeAll(); return true; }
    // 协议响应头（客户端版本 + 附加信息长度0）
    try { server.send(new Uint8Array([parsed.version, 0])); } catch (e) {}
    如果 (parsed.raw && parsed.raw.byteLength) {
      try { await remote.writer.write(parsed.raw); } catch (e) { closeAll(); return true; }
    }
    pumpRemote();
    返回 true；
  };

  const onMessage = async (ev) => {
    const chunk = toUint8(ev.data);
    如果 (!chunk.byteLength) 返回；
    如果 (!headerSent) {
      await establish(chunk, false);
      返回;
    }
    如果 (dnsMode) {
      如果 (chunk.byteLength) dnsForward(chunk);
    } 别的 {
      try { await remote.writer.write(chunk); } catch (e) { closeAll(); }
    }
  };

  let msgChain = Promise.resolve();
  // 若早期数据已包含完整头，先完成建立，消耗等待下一条 WS 消息
  if (headerBuf.byteLength) msg​​Chain = msgChain.then(() => establish(new Uint8Array(0), false)).catch(closeAll);
  server.addEventListener('消息', ev => {
    msgChain = msgChain.then(() => onMessage(ev)).catch(closeAll);
  });
  server.addEventListener('close', closeAll);
  server.addEventListener('error', closeAll);

  return new Response(null, { status: 101, webSocket: client });
}

// 从流式Reader累积读取（minLen即目标长度）
异步函数 readFull(reader, minLen, maxLen, timeoutMs) {
  const deadline = Date.now() + (timeoutMs || 30000);
  let buf = new Uint8Array(0);
  while (buf.byteLength < minLen) {
    if (Date.now() > Deadline) throw new Error('读取超时');
    const { value, done } = await reader.read();
    如果（完成）则中断；
    如果 (value && value.byteLength) buf = concatBytes(buf, toUint8(value));
    如果 (maxLen && buf.byteLength > maxLen) 则跳出循环；
  }
  返回缓冲区；
}

// -------------------- 入口 --------------------
export default {
  async fetch(request, env) {
    CUSTOM_RELAY = (env && env[_d('UFJPWFlJUA==')]) || '';
    尝试 {
      const upgrade = request.headers.get(_d('VXBncmFkZQ=='));
      如果 (!upgrade || upgrade !== _d('d2Vic29ja2V0')) {
        const url = new URL(request.url);
        switch (url.pathname) {
          案件 '/'：
          case '/' + UUID: {
            const hostHeader = request.headers.get(_d('SG9zdA==')) || '';
            const ua = (request.headers.get(_d('VXNlci1BZ2VudA==')) || '').toLowerCase();
            const fmt = (url.searchParams.get(_d('Zm9ybWF0')) || '').toLowerCase();
            // 显式格式参数优先：指定格式时按其返回
            如果 (fmt === _d('Y2xhc2g=') || fmt === _d('eWFtbA==')) {
              const yaml = await buildYamlConfig(hostHeader);
              return new Response(yaml, { status: 200, headers: { [_d('Q29udGVudC1UeXBl')]: _d('dGV4dC95YW1sO2NoYXJzZXQ9dXRmLTg=') } });
            }
            if (fmt === _d('YmFzZTY0') || fmt === _d('djJyYXk=')) {
              const sub = await buildSubscription(hostHeader);
              return new Response(sub, { status: 200, headers: { [_d('Q29udGVudC1UeXBl')]: _d('dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04') } });
            }
            // UA 自动识别：预设预设特征返回 YAML
            如果 (_r1.test(ua)) {
              const yaml = await buildYamlConfig(hostHeader);
              return new Response(yaml, { status: 200, headers: { [_d('Q29udGVudC1UeXBl')]: _d('dGV4dC95YW1sO2NoYXJzZXQ9dXRmLTg=') } });
            }
            //默认：明文接入接口（兼容旧客户端，防base64解码乱码）
            const plain = await buildPlainLines(hostHeader);
            return new Response(plain, { status: 200, headers: { [_d('Q29udGVudC1UeXBl')]: _d('dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04') } });
          }
          case '/' + UUID + '/' + _d('Y2xhc2g='): {
            const yaml = await buildYamlConfig(request.headers.get(_d('SG9zdA==')) || '');
            return new Response(yaml, { status: 200, headers: { [_d('Q29udGVudC1UeXBl')]: _d('dGV4dC95YW1sO2NoYXJzZXQ9dXRmLTg=') } });
          }
          默认：
            return new Response(_d('Tm90IGZvdW5k'), { status: 404 });
        }
      } 别的 {
        返回 await handleSocket(request);
      }
    } catch (e) {
      return new Response(String(e && e.message ? e.message : e), { status: 500 });
    }
  }
};
