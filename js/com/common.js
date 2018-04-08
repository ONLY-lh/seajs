;
(function(global, undefined) {
    var common = {
        extdata: {},
        isIos: function() {
            // 是否ios
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isiOS;
        },
        isAndroid: function() {
            // 是否anAndroid
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            return isAndroid;
        },
        setFontSize: function() {
            // 移动端自适应
            var oHtml = document.documentElement;
            var screenWidth = oHtml.clientWidth;
            if (screenWidth <= 320) {
                oHtml.style.fontSize = 10 + 'px';
            } else if (screenWidth >= 750) {
                oHtml.style.fontSize = 20 + 'px';
            } else {
                oHtml.style.fontSize = screenWidth / 750 * 20 + 'px';
            }
        },
        getUrlParam: function(name) {
            // 获取url参数
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        openNewPage: function(url, params) {
            // 打开新页面
            var str = '?';
            for (var i in params) {
                str += i + '=' + params[i] + '&';
            }
            var rightStr = str.substring(0, str.length - 1);
            window.location.href = url + rightStr;
        },
        timeFormate_date_time: function(times, seperator) {
            // 时间格式化（年月日 时分秒）
            var timeStr, date, time;
            timeStr = new Date(times);
            var year = timeStr.getFullYear();
            var month = timeStr.getMonth() + 1;
            var day = timeStr.getDate();
            var hour = timeStr.getHours();
            var minute = timeStr.getMinutes();
            var second = timeStr.getSeconds();
            if (!seperator) seperator = '-';
            date = year + seperator + this.timeAddZero(month) + seperator + this.timeAddZero(day);
            time = this.timeAddZero(hour) + ':' + this.timeAddZero(minute) + ':' + this.timeAddZero(second);
            return date + ' ' + time;
        },
        timeFormate_date_hour_minute: function(times, seperator) {
            // 时间格式化（年月日 时分）
            var timeStr, date, time;
            timeStr = new Date(times);
            var year = timeStr.getFullYear();
            var month = timeStr.getMonth() + 1;
            var day = timeStr.getDate();
            var hour = timeStr.getHours();
            var minute = timeStr.getMinutes();
            if (!seperator) seperator = '-';
            date = year + seperator + this.timeAddZero(month) + seperator + this.timeAddZero(day);
            time = this.timeAddZero(hour) + ':' + this.timeAddZero(minute);
            return date + ' ' + time;
        },
        timeFormate_date: function(times, seperator) {
            // 时间格式化（年月日）
            var timeStr, date, time;
            timeStr = new Date(times);
            var year = timeStr.getFullYear();
            var month = timeStr.getMonth() + 1;
            var day = timeStr.getDate();
            if (!seperator) seperator = '-';
            date = year + seperator + this.timeAddZero(month) + seperator + this.timeAddZero(day);
            return date;
        },
        timeFormate_time: function(times, seperator) {
            // 时间格式化（时分秒）
            var timeStr, date, time;
            timeStr = new Date(times);
            var hour = timeStr.getHours();
            var minute = timeStr.getMinutes();
            var second = timeStr.getSeconds();
            if (!seperator) seperator = '-';
            time = this.timeAddZero(hour) + ':' + this.timeAddZero(minute) + ':' + this.timeAddZero(second);
            return time;
        },
        timeAddZero: function(num) {
            // 日期的日月统一为两位数
            if (num.toString().length === 1) {
                return '0' + num;
            } else {
                return num.toString();
            }
        },
        equalsIgnoreCase: function(val1, val2) {
            // 忽略大小写检测字符串是不是相等
            return val1.toUpperCase() == val2.toUpperCase();
        },
        isChinese: function(val) {
            // 检测是否全为中文，并且前后中间不能有空格
            return /^[\u4E00-\uFA29]*$/.test(val) && (!/^[\uE7C7-\uE7F3]*$/.test(val.replace(/(^\s*)|(\s*$)/g, '')));
        },
        isEmail: function(val) {
            // 检测是否为Email
            var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/i;
            return reg.exec(val) !== null;
        },
        isPost: function(val) {
            // 检测是否为邮编
            return /^\d{6}$/.test(val);
        },
        isMobile: function(val) {
            // 检测是否为手机号
            var reg = /^1[3|4|5|7|8][0-9]{9}$/;
            return reg.test(val);
        },
        isIdentityCard: function(val) {
            // 检测是否为身份证号
            return /^[1-9]((\d{14})|(\d{16}(\d|X|x)))$/.test(val);
        },
        hasNoSpecial: function(val) {
            // 检测是否含有特殊字符
            return /^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(val);
        },
        dealMobile: function(val) {
            // 隐藏手机号中间四位
            if (typeof val === 'number') {
                val = val.toString();
            }
            return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        },
        dealIdentityCard: function(val) {
            // 隐藏身份证号中间几位
            if (typeof val === 'number') {
                val += '';
            }
            var s;
            s = val.length === 18 ? val.replace(/(\d{3})\d{12}([\d{3}]|[\d{2}]X)/, '$1************$2') : val.replace(/(\d{3})\d{9}(\d{3})/, '$1*********$2');
            return s;
        },
        isOdd: function(num) {
            // 检测是否为奇数
            if (typeof num !== 'number') {
                throw new Error('parameter must be number type');
            } else {
                return num % 2 === 1;
            }
        },
        getStyle: function(obj, attr) {
            // 获取元素样式
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        },
        type: function(obj) {
            // 判断数据类型
            return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
        },
        isArray: function(v) {
            // 判断是否为数组
            return Object.prototype.toString.call(v) === '[object Array]';
        }


    };

    // 数组内查找值
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    // 数组内删除值
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    // 去掉前后空格
    String.prototype.trim = function() {
        return this.replace(/^\s*(.*?)\s+$/, "$1")
    }
    // 去掉前空格
    String.prototype.trimLeft = function() {
        return this.replace(/^(\s*|　*)/, "");
    }
    // 去掉后空格
    String.prototype.trimRight = function() {
        return this.replace(/(\s*|　*)$/, "");
    }
    // 去掉前后中间空格
    String.prototype.trimMiddle = function() {
        return this.replace(/\s/g, "");
    }

    window.common = common;

})(window);