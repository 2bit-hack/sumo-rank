; (function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // console.log('AMD')
    define(factory);
  } else if (typeof exports === 'object') {
    // console.log('CommonJS system')
    module.exports = factory();
  } else {
    root.sumoRank = factory();
  }
}( typeof self !== 'undefined' ? self : this, function () {

    class Sumo {
      constructor() {
        const ranks = {
          yokozuna : {
            Nn: "Yokozuna",
            nn: "yokozuna",
            N: "Y",
            n: "y"
          },
          ozeki : {
            Nn: "Ozeki",
            nn: "ozeki",
            N: "O",
            n: "o"
          },
          sekiwake : {
            Nn: "Sekiwake",
            nn: "sekiwake",
            N: "S",
            n: "s"
          },
          komusubi : {
            Nn: "Komusubi",
            nn: "komusubi",
            N: "K",
            n: "k"
          },
          maegashira : {
            Nn: "Maegashira",
            nn: "maegashira",
            N: "M",
            n: "m"
          },
          juryo : {
            Nn: "Juryo",
            nn: "juryo",
            N: "J",
            n: "j"
          },
          makushita : {
            Nn: "Makushita",
            nn: "makushita",
            N: "Ms",
            n: "ms"
          },
          sandanme : {
            Nn: "Sandanme",
            nn: "sandanme",
            N: "Sd",
            n: "sd"
          },
          jonidan : {
            Nn: "Jonidan",
            nn: "jonidan",
            N: "Jd",
            n: "jd"
          },
          jonokuchi : {
            Nn: "Jonokuchi",
            nn: "jonokuchi",
            N: "Jk",
            n: "jk"
          },
          east : {
            Dd: "East",
            dd: "east",
            D: "E",
            d: "e"
          },
          west : {
            Dd: "West",
            dd: "west",
            D: "W",
            d: "w"
          }
        }
        const rankLetterTypes = ["Yokozuna", "yokozuna", "Ozeki", "ozeki", "Sekiwake", "sekiwake", "Komusubi", "komusubi", "Maegashira", "maegashira", "Juryo", "juryo", "Makushita", "makushita", "Sandanme", "sandanme", "Jonidan", "jonidan", "Jonokuchi", "jonokuchi", "East", "east", "West", "west", "Ms", "ms", "Sd", "sd", "Jd", "jd", "Jk", "jk", "Y", "y", "O", "o", "S", "s", "K", "k", "M", "m", "J", "j", "E", "e", "W", "w"];
        const rankNumberTypes = [null, /[0-9]{1}/, /[0-9]{2}/, /[0-9]{3}/]
        const formatTypes = ["Nn", "nn", "N", "n", "Dd", "dd", "D", "d", "#"];
        // MUTABLE VARIABLES
        let formatStrCopy = '';
        let rankStr; // .format() only
        let formatStr; // .format() only
        let rankArr // .sort() only
        let propzArr // .sort() only
        let errorResult = null;
        let numbers = {};
        let rank = {
          name: null,
          number: null,
          direction: null
        };
        const nameList = ['Ms', 'Sd', 'Jd', 'Jk', 'Y', 'O', 'S', 'K', 'M', 'J']; //.sort() only
        const directionList = ['E', 'W']; //.sort() only
        function stateReset() {
          formatStrCopy = '';
          rankStr = undefined;
          formatStr = undefined;
          rankArr = undefined;
          rank.name = null;
          rank.number = null;
          rank.direction = null;
          errorResult = null;
          numbers = {};
          rank = {
            name: null,
            number: null,
            direction: null
          }
        }
        function errorTest() {
          try {
            inputRank(rankStr)
            inputFormat(formatStr)
          }
          catch (error) {
            errorResult = error;
          }
        }
        function inputRank(rankStr) {
          if (rankStr.length === 0) {
            throw `SR.301 Rank Error - Empty Rank string`
          } else if (rankStr.trim().length !== rankStr.length && rankStr.trim().length === 0) {
            throw `SR.302 Rank Error - Blank Rank string`
          }
        }
        function inputFormat(formatStr) {
          if (typeof formatStr !== "string") {
            throw `SR.403 Format Error - Incorrect Format type, not a string`
          } else if (formatStr.length === 0) {
            throw `SR.401 Format Error - Empty Format string`
          } else if (formatStr.trim().length !== formatStr.length && formatStr.trim().length === 0) {
            throw `SR.402 Format Error - Blank Format string`
          } else {
            formatStrCopy = formatStr.slice();
          }
        }
        function populateNumbers() {
          for (let i = 0; i < 200; i++) {
            numbers[i] = i;
          }
        }
        function rankAssignTypes(rType, rValue) {
          try {
            // console.log('rank[rType]', rank[rType])
            if (rank[rType] === null) {
              rank[rType] = rValue;
            } else {
              throw `SR.305 Rank Error - Found multiple instances`
            }
          }
          catch (error) {
            errorResult = error;
          }
        }
        function spliceStr(str, start, end) {
          // Takes out rank instances from rank string on which this method was called
          let slice1 = str.slice(0, start);
          let slice2 = str.slice(end);
          let sliceReturn = str.slice(start, end)
          return [sliceReturn, slice1.concat(slice2)];
        }
        function findRanks() {
          populateNumbers();
          // Populate rank state by searching for rank in rankString
          for (let i = 0; i < rankLetterTypes.length; i++) {
            let rankIndex = rankStr.indexOf(rankLetterTypes[i])
            if (rankIndex !== -1) {
              let type = rankLetterTypes[i];
              for ( let rankName in ranks ){
                let rankItem = ranks[rankName];
                if ( type === rankItem['Dd'] || 
                  type === rankItem['dd'] ||
                  type === rankItem['D'] || 
                  type === rankItem['d']){
                  // console.log('direction is rankItem:', rankItem);
                  rankStr = spliceStr(rankStr, rankIndex, rankIndex + rankLetterTypes[i].length)[1];
                  rankAssignTypes("direction", rankItem);
                } else if ( type === rankItem['Nn'] ||
                  type === rankItem['nn'] ||
                  type === rankItem['N'] ||
                  type === rankItem['n'] ) {
                  // console.log('name is rankItem:', rankItem);
                  rankStr = spliceStr(rankStr, rankIndex, rankIndex + rankLetterTypes[i].length)[1];
                  rankAssignTypes("name", rankItem);
                }
              }
            }
          }
          for (let j = rankNumberTypes.length - 1; j >= 0; j--) {
            let rankObj = rankStr.match(rankNumberTypes[j]);
            let rankIndex = -1;
            if (rankObj !== null) {
              // console.log("rankObj", rankObj)
              rankIndex = rankObj["index"];
              // console.log("rankIndex", rankIndex)
            }
            if (rankIndex !== -1) {
              let slice = spliceStr(rankStr, rankIndex, rankIndex + j)[0];
              rankStr = spliceStr(rankStr, rankIndex, rankIndex + j)[1];
              rank.number = numbers[slice];
              break;
            }
          }
          if (rankStr.trim().length !== 0) {
            throw `SR.304 Non-rank items Error - '${rankStr}' found in string`
          }
        }
        function replaceRanks() {
          // Loops thru format string an replaces format with desired format/rank type
          let completed = {
            name: false,
            number: false,
            direction: false
          }
          for (let k = 0; k < formatStrCopy.length; k++) {
            for (let l = 0; l < formatTypes.length; l++) {
              let formatItem = formatTypes[l];
              let sliceEnd = k + formatItem.length;
              let slice = formatStrCopy.slice(k, sliceEnd);
              if (formatItem === slice) {
                let rKey;
                try {
                  if (l === 0 || l === 1 || l === 2 || l === 3) {
                    rKey = "name";
                    console.log('name type:', slice, ', completed.name:', completed.name)
                    if (rank[rKey] === null) {
                      throw `SR.306 Insufficient Rank Info Error - format string requests 'rank name' type, but rank string does not provide it`
                    } else if ( completed.name === false ){
                      formatStrCopy = formatStrCopy.replace(formatItem, rank[rKey][formatItem])
                      k += rank[rKey][formatItem].length;
                      completed.name = true;
                    } else if ( completed.name === true ){
                      throw `SR.406 Duplicate Format Error - format string requests 'rank name' type, ${formatItem}, multiple times`
                    }
                  } else if (l === 4 || l === 5 || l === 6 || l === 7) {
                    console.log('direction type:', slice, ', completed.direction:', completed.direction)
                    rKey = "direction";
                    if (rank[rKey] === null) {
                      throw `SR.308 Insufficient Rank Info Error - format string requests 'rank direction' type, but rank string does not provide it`
                    } else if ( completed.direction === false ){
                      formatStrCopy = formatStrCopy.replace(formatItem, rank[rKey][formatItem])
                      k += rank[rKey][formatItem].length;
                      completed.direction = true;
                      console.log('completed.direction', completed.direction)
                    } else if ( completed.direction === true ){
                      throw `SR.408 Duplicate Format Error - format string requests 'rank direction' type, ${formatItem}, multiple times`
                    }
                  } else if (l === 8) {
                    console.log('number type:', slice, ', completed.number:', completed.number)
                    rKey = "number";
                    if (rank[rKey] === null) {
                      throw `SR.307 Insufficient Rank Info Error - format string requests 'rank number' type, but rank string does not provide it`
                    } else if ( completed.number === false ){
                      formatStrCopy = formatStrCopy.replace(formatItem, rank[rKey])
                      k += rank[rKey].toString().length - 1;
                      completed.number = true;
                      // console.log('completed.number', completed.number)
                    } else if ( completed.number === true ){
                      throw `SR.407 Duplicate Format Error - format string requests 'rank direction' type, ${formatItem}, multiple times`
                    }
                  }
                }
                catch (error){
                  errorResult = error;
                }
              }
            }
          }
        }
        function testNumberLimits() {
          // Makes sure all rank/number combos are valid
          // example: Maegashira cannot go over 17
          if ((rank.name === ranks.maegashira && rank.number > 17
            || rank.name === ranks.juryo && rank.number > 14
            || rank.name === ranks.makushita && rank.number > 60
            || rank.name === ranks.sandanme && rank.number > 100)) {
            try {
              throw `SR.101 Non-existent Rank Name/Number Error - ${rank.name.Nn} Rank can not have a number of ${rank.number}`
            }
            catch (error) {
              errorResult = error;
            }
          }
        }
        function returnResult() {
          if (errorResult) {
            return errorResult;
          } else {
            return formatStrCopy;
          }
        }
        function checkVersion() {
          if (rankArr[0]['rank'] && rankArr[0]['rank']['name']) {
            // console.log('v2')
            return sortV2();
          } else {
            // console.log('v1')
            return sortV1();
          }
        }
        function sortV1() {
          return rankArr.sort(function (a, b) {
            var aName = findNameVal(a['rank']);
            var bName = findNameVal(b['rank']);
            if (aName === bName) {
              // console.log('Found 2 with same name rank:', a, b)
              var aNumber = findNumberVal(a['rank']);
              var bNumber = findNumberVal(b['rank']);
              if (aNumber === bNumber) {
                // console.log('found 2 with same number rank:', a, b)
                var aDirection = findDirectionVal(a['rank']);
                var bDirection = findDirectionVal(b['rank']);
                if (aDirection === bDirection) {
                  // Place duplicate rank error here?
                }
                return aDirection - bDirection;
              } else {
                return aNumber - bNumber;
              }
            } else {
              return aName - bName;
            }
          })
        }
        function sortV2() {
          rankArr.sort(function (a, b) {
            var aName = getNameVal(a['rank']['name']);
            var bName = b['rank']['name'];
            var aNumber = a['rank']['number'];
            var bNumber = a['rank']['number'];
            var aDirection = a['rank']['direction'];
            if (aName === bName) {
              if (aNumber === bNumber) {
                if (aDirection === 'E') {
                  return 1 - 2;
                } else {
                  return 2 - 1;
                }
              } else {
                return aNumber - bNumber;
              }
            }
            return aName - bName;
          })
        }
        function findNameVal(rankStrV1) {
          let foundName = '';
          for (let i = 0; i < nameList.length; i++) {
            // Checks for a match, match at index i of nameList, returns index of match on input rank to foundName
            foundName = rankStrV1.indexOf(nameList[i]);
            if (foundName !== -1) {
              // console.log('For input', rankStrV1 + ':', 'found', nameList[i], 'at index', foundName)
              // For match at index of nameList, assign a number value, used for sorting
              let assignedVal = getNameVal(nameList[i]);
              // console.log('Assigned Value for', nameList[i],'is', assignedVal)
              return assignedVal;
            }
          }
        }
        function findNumberVal(rankStrV1) {
          for (let j = rankNumberTypes.length - 1; j >= 0; j--) {
            let foundNumber = rankStrV1.match(rankNumberTypes[j]);
            // Returns an array, foundNumber = [ '1', index: 1, input: 'Y1E', groups: undefined ]
            if (foundNumber !== null) {
              let index = foundNumber.index;
              let assignedVal = rankStrV1.slice(index, index +j);
              // Rank numbers returned directly for sorting
              return assignedVal;
            }
          }
        }
        function findDirectionVal(rankStrV1) {
          let foundDirection = '';
          for (let i = 0; i < directionList.length; i++) {
            // Checks for a match, match at index i of directionList, returns index of match on input rank to foundDirection
            foundDirection = rankStrV1.indexOf(directionList[i]);
            if (foundDirection !== -1 && directionList[i] === 'E') {
              return 1;
            } else if (foundDirection !== -1 && directionList[i] === 'W') {
              return 2;
            }
          }
        }
        function getNameVal(name) {
          switch (name) {
            case 'Y':
              return 1;
              break;
            case 'O':
              return 2;
              break;
            case 'S':
              return 3;
              break;
            case 'K':
              return 4;
              break;
            case 'M':
              return 5;
              break;
            case 'J':
              return 6;
              break;
            case 'Ms':
              return 7;
              break;
            case 'Sd':
              return 8;
              break;
            case 'Jd':
              return 9;
              break;
            case 'Jk':
              return 10;
              break;
          }
        }

        this.sort = function (rankArray) {
          stateReset();
          rankArr = rankArray;
          return checkVersion();
        }
        this.format = function (rank, format) {
          stateReset();
          rankStr = rank;
          formatStr = format;
          errorTest();
          findRanks();
          replaceRanks();
          testNumberLimits();
          return returnResult();
        }
      }
    }
    return sumoRank = new Sumo();
}));