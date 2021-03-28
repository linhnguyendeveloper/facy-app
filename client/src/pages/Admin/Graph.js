import React from 'react';
import { Line } from '@ant-design/charts';

function Graph() {
    const data = [
        {
          "year": "2010-01",
          "value": 1998
        },
        {
          "year": "2010-02",
          "value": 1850
        },
        {
          "year": "2010-03",
          "value": 1720
        },
        {
          "year": "2010-04",
          "value": 1818
        },
        {
          "year": "2010-05",
          "value": 1920
        },
        {
          "year": "2010-06",
          "value": 1802
        },
        {
          "year": "2010-07",
          "value": 1945
        },
        {
          "year": "2010-08",
          "value": 1856
        },
        {
          "year": "2010-09",
          "value": 2107
        },
        {
          "year": "2010-10",
          "value": 2140
        },
        {
          "year": "2010-11",
          "value": 2311
        },
        {
          "year": "2010-12",
          "value": 1972
        },
        {
          "year": "2011-01",
          "value": 1760
        },
        {
          "year": "2011-02",
          "value": 1824
        },
        {
          "year": "2011-03",
          "value": 1801
        },
        {
          "year": "2011-04",
          "value": 2001
        },
        {
          "year": "2011-05",
          "value": 1640
        },
        {
          "year": "2011-06",
          "value": 1502
        },
        {
          "year": "2011-07",
          "value": 1621
        },
        {
          "year": "2011-08",
          "value": 1480
        },
        {
          "year": "2011-09",
          "value": 1549
        },
        {
          "year": "2011-10",
          "value": 1390
        },
        {
          "year": "2011-11",
          "value": 1325
        },
        {
          "year": "2011-12",
          "value": 1250
        },
        {
          "year": "2012-01",
          "value": 1394
        },
        {
          "year": "2012-02",
          "value": 1406
        },
        {
          "year": "2012-03",
          "value": 1578
        },
        {
          "year": "2012-04",
          "value": 1465
        },
        {
          "year": "2012-05",
          "value": 1689
        },
        {
          "year": "2012-06",
          "value": 1755
        },
        {
          "year": "2012-07",
          "value": 1495
        },
        {
          "year": "2012-08",
          "value": 1508
        },
        {
          "year": "2012-09",
          "value": 1433
        },
        {
          "year": "2012-10",
          "value": 1344
        },
        {
          "year": "2012-11",
          "value": 1201
        },
        {
          "year": "2012-12",
          "value": 1065
        },
        {
          "year": "2013-01",
          "value": 1255
        },
        {
          "year": "2013-02",
          "value": 1429
        },
        {
          "year": "2013-03",
          "value": 1398
        },
        {
          "year": "2013-04",
          "value": 1678
        },
        {
          "year": "2013-05",
          "value": 1524
        },
        {
          "year": "2013-06",
          "value": 1688
        },
        {
          "year": "2013-07",
          "value": 1500
        },
        {
          "year": "2013-08",
          "value": 1670
        },
        {
          "year": "2013-09",
          "value": 1734
        },
        {
          "year": "2013-10",
          "value": 1699
        },
        {
          "year": "2013-11",
          "value": 1508
        },
        {
          "year": "2013-12",
          "value": 1680
        },
        {
          "year": "2014-01",
          "value": 1750
        },
        {
          "year": "2014-02",
          "value": 1602
        },
        {
          "year": "2014-03",
          "value": 1834
        },
        {
          "year": "2014-04",
          "value": 1722
        },
        {
          "year": "2014-05",
          "value": 1430
        },
        {
          "year": "2014-06",
          "value": 1280
        },
        {
          "year": "2014-07",
          "value": 1367
        },
        {
          "year": "2014-08",
          "value": 1155
        },
        {
          "year": "2014-09",
          "value": 1289
        },
        {
          "year": "2014-10",
          "value": 1104
        },
        {
          "year": "2014-11",
          "value": 1246
        },
        {
          "year": "2014-12",
          "value": 1098
        },
        {
          "year": "2015-01",
          "value": 1189
        },
        {
          "year": "2015-02",
          "value": 1276
        },
        {
          "year": "2015-03",
          "value": 1033
        },
        {
          "year": "2015-04",
          "value": 956
        },
        {
          "year": "2015-05",
          "value": 845
        },
        {
          "year": "2015-06",
          "value": 1089
        },
        {
          "year": "2015-07",
          "value": 944
        },
        {
          "year": "2015-08",
          "value": 1043
        },
        {
          "year": "2015-09",
          "value": 893
        },
        {
          "year": "2015-10",
          "value": 840
        },
        {
          "year": "2015-11",
          "value": 934
        },
        {
          "year": "2015-12",
          "value": 810
        },
        {
          "year": "2016-01",
          "value": 782
        },
        {
          "year": "2016-02",
          "value": 1089
        },
        {
          "year": "2016-03",
          "value": 745
        },
        {
          "year": "2016-04",
          "value": 680
        },
        {
          "year": "2016-05",
          "value": 802
        },
        {
          "year": "2016-06",
          "value": 697
        },
        {
          "year": "2016-07",
          "value": 583
        },
        {
          "year": "2016-08",
          "value": 456
        },
        {
          "year": "2016-09",
          "value": 524
        },
        {
          "year": "2016-10",
          "value": 398
        },
        {
          "year": "2016-11",
          "value": 278
        },
        {
          "year": "2016-12",
          "value": 195
        },
        {
          "year": "2017-01",
          "value": 145
        },
        {
          "year": "2017-02",
          "value": 207
        }
      ];

    const config = {
        data,
        height: 400,
       
        xField: 'year',
        yField: 'value',
        point: {
            size: 2,
            shape: 'diamond',
        },
    };
    return <Line {...config} />;
};
export default Graph;