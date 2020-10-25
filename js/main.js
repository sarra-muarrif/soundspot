var API_KEY = 'BQDTFydJmcREN-pGwqAokeFS0VROJM8RkokeXNnbX41KaqCse7aDpMOGqKYUNPFS_5zLjCcMaYImZY0twWlXz5vnwAHyxDMqyK7FhBzg7FH6Dno73sg9XtI3ZVtLQWaKxyhesCxRTu9QR_P2miYdymmoBT54SsE';
/*
مثال من هذا الموقع 
Spotify: https://developer.spotify.com/console/get-search-item/?q=cheb%20khaled&type=artist&market=&limit=&offset=
عند الضغط على زر:
Try It
سترى الرد من الخادم

ولفهم كيفية إرسال الطلب يجب فتح هذا الرابط
https://developer.spotify.com/documentation/web-api/reference/search/search/
*/
/*GET https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09*/

var API_ENDPOINT = 'https://api.spotify.com/v1/search';
const params = getHashParams();

if (params.access_token) {
    setCookie('accessToken', params.access_token)
    document.location.hash = ''
}

const renderData = (res, searchType) => {
    const resList = res[Object.keys(res)[0]]
    document.querySelector('.searchResults').classList.remove('is-hidden')
    document.querySelector('.musicList').innerHTML = resList.items.map(item => {
        console.log(item)
        let tagLine;
        switch (searchType) {
            case 'artist':
                tagLine = item.name
                break
            case 'playlist':
                tagLine = item.owner.display_name
                break
            default:
                tagLine = item.artists[0].name
        }

        let image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8zMzP4+Pj39/fr6+smJiYaGhr7+/swMDDb29vX19ccHBwfHx80NDTCwsL09PRBQUE6OjorKytHR0eXl5dfX1+hoaGpqaloaGhVVVXPz88TExMAAACKioqUlJRKSkptbW3j4+N5eXlaWlq2traCgoKMjIwNDQ2wsLDGxsZ1dXW7u7tsbGz7cLDZAAAXz0lEQVR4nO2dC3equhKAeRiIAgKhqGjrq7W22v//+85MAohAAqRqd8/qrHv30RoYvjwnJJMxjD/5kz/5k5+TMPxR9ZZ9bw3uaHRvFUq5u3rX+tkitEfWnTVYluveWYVSvWvdWX1ohK5WQ7AtG//3TfUW3EcL0bZDUN9d/G4YunpFaLt26MLDfa+K4z209IN62wXCLvV4eyhCDRU2Phdkvq1XAXLRVs+zxbK61VsgkI3Dy8EuM/47iBaWgq2hHi4sPynVQ0HDo0I2DtVgcw1u/lm3orqYt6470lRffJarB/rQ1upnbKiebgjFz59Nty2CZlQfDh4seAWCbk6UjKIt4pOFOpVMaOAPefk+WLh6nfzlfS+/zM7VS/IIMgFubw/Pf+hBixpqWLnOwTfBOgD9nN2jv29V73aqhwYIjVzPJnSNktBFZTpFiLlrGTrWDCfML7R4VWjXb/FarOiorbFUJhP4/44LfNztxhN5Wqksd3iV+sr2p7MrZWjhcN6WT9jGIWGoIBw9exJx6MbxnDgFifwsTTPflyWV3cGLfDNbeRuiTPbcbpLzShmKT1iHWitCiL1DqDS5RsSUCM0SCv9GWRYFi8UilaWTS7SIWRpFKVUnI+2E4rHh6W0sIFlXZWNDV7YfFeGGPxqlHDAYToiIUPhxRyoJYdl3WJUO4VrAZDXUVVRJaJppInI/1QGkcRxTQHztApQRujmiK6+iMCO0ja5ZgYpQIMJjalRRmkRREtHOKionRFuT/0cKCJao0W1ICELit0sWwz8mdjJDJWAB9UzqecpUREUIiDYnbG+DMB3Dcu4c6DkhmX9O22V5nk7PS8mPCjnDVcvz+axO9TknKkKBKBkH8Uc0KbsABaGzkyfQnJoLk6vr2rGjJMQykhprYA32em8hCMdyHfbwKYlQD/WnM4O7CA2VvQfdTJ85Zxehrlih1aMGdRJ26OiT6l6EiNid6HuE/eRuhL3kj/AW8kd4X/kjvIXckXD0cTjtZxNVkl9NOFocfcYYcehZnug3E55XrJhlOCdpql9MeF5Vpkf+lyzZ7yXcOVfTQu9Jku73Ep6YeSUyiF9LuFuZNUJJIf5awg+/Rkg37Ql/LeGB1QnN9onOv0bYeypcb4ZSin+NcDHvedN9g5BJCNmDCINehGuP9FzBeqq/oqRxe8Ixie5PGJtm0qsMP1Ymeel306VTL0KJWTN24ojSe5dhkvSqpZ/OgC4pqr0Hdj7b00E7jJN/hHBM8KFZ2u+ub9eFKL3sIYQx7VNLR4EoFUcxUajKttoSKZO9j31MLcVn6CK0NqzoMnoOGell0GdEOkd8SE/Ta7RIyyIh6543Xq94vTaZk8kJHjZadBHuK1aYr1gBuL7zOj6uVs5W0slw+VdG/LVX7TUWQ+7eMYD+I4Qf1x2jpyqUgfJvEC6P/ewTHfknCHdefRXXn91M+79AODKby9TOzfZT/wOE5UBYFba/lfZ/gHDRupFhpXzNO0B+nvBQfx2RdzaSlxKD5ccJn+qzoIIw+LiN9p8mfKu/MisAE9p3LtwhP0zYmMcWktDec+EO+VnCnS/ZzpSYqqY7SH6UMKQqwN5zYbX8KGHbQHgBBPO051xYKT9J+CXZ0VcAgnl6A0+tHyR8aQ6EcXT9vfdcWCFDCLtmYtLrWglnzW6URvWNov73834AYTjSdNppJTw3B0L6+lpvmIPmwu3Sn1C6gc/o8k5tI2wZCGmWsay+T1j2FvRKlL4kvQkt15Zuk0PfOht3C7dLC+GONMYJytIse63/mQbdj2bjTmXbtkatxnpvQvTckrRDdOni290liE3CMG4CZmmcps3ho3suzB1mIIfdLGr7uSdhiFtA5YDFh/ZCbhI2B0L6mm1Smma0sZ3d6+jfyh2u21falhv9CC2X7wZufVNrX/4sQWwQNmeENFoEm8UmzppGTsdcuPQffPfitA2kF6GF29XRg7ENEDUUu2zbK2qdsDkQ0k2yWaTRawtgx1yYq3ehC5h7YCCkWz1COwyhu2r3DeRVFH/IPfjaSrFGOG+MEzBMLKLNIm43U2mmAhQetmLZigZZs+vtQQjPboeS4hFOtEKZ+LeTcHpsImQsXWw2rSUI4knnwqX6Xe6ZEr829HcTWtx3K2xvYrm3gnH5t4tw0izBJGZpEiwCmWMIpbLOxs7V2+kC3UoojbLGpLKTkO9W516orb9enHgtrM2tPqBVwuZAiFU0piyTlSA+n2wuzHs5eIQtJ0ySZBEf6622izB0caS3pPYMIgp47srbmq5C2BwI6QaqaMQ2jbH+qp7K5sJYhyzjJV0sNjT9+loEzTdYHYQ2t2RcqVkkzmnASmTLHfgqhFljIMxiGqUsa5oAVZHNhbkTqPEOgBlF3zA03OsmgpoQt/sDhHzTf97s7JD7kUrMugvhtjkjzBbxJm1aa/VCbJ8L8yF6vgqioAQ0aY1GTWgLL3C5YVueZsKrqGTttiRsmRHiWB+nXYCydWFUP+U2fAkIBX69EbOzlkL5qSz3ogLbsipaIZw35hObzYY7EPZwr2ufC1vGBHONZhfAeoErCC3oGtG/WT0rzM9acKUlWHp2fdYGwsDcQP+eRDTu41rptJfCLsVdJ/S1AggDf/VR5IRQAdwe7pP5OQjy3rbwzvvw6g+dwIPFLOlRgqass3E3DMd6uFE1l8ihD6HFz0joc2gMNAbXVjnY5R6WjYdO2OIryTZ9+EBWy5Zb4/aGNGHR4roarCqji5QQjRg37KiiOaKr9iGTecluaJx0dzKFtK0L8+0NNE1rgFdp5WWI5+IoO5kKojqZjDBOmNQWbZHmXHjm5TyNm/iXLY6KWmqoe9H+IvV0jpNNf8Dmi7epZFUH5dIxqXqaXlX0O4Rmeycq8z2vzYXHslUdnnZxlax9tPjWoUb9CNul8da0EKdqVY9Ye/kH4mpn2k14MxlK2HwxnAurzIXtRLLokWcQDeyfJVSegiBFrMyF21f/K4jFlOtnCKUIHb9f5sKS1f/q1fn7nR8h7AKUpygKpmXRo3E12/wYYTegPI2YC8tW/0uJLjPFHyDsAyhNxV7hhpOGidt+Ned6PGE/QFk6ap7hfj3sBLyaD4oPJ+wLKEkZmUHLoocMEWeKjybsD9iaNgnarFApIqXuowmHADZT0wTNvN6TEbgaZoqPJRwGWE8vAAcIXH3c7R5JOBTw+orBgIhINzvvcYTDAavXaAAiIjk9yhtBD/BylRYgXs0N9IcQ6gEW1+kBllofQagLKK7UBbyybu5IGNBvAPKHjHQB8wy6t2cXjb4DiOtTfUf5Voni2Lx3LY033wEES+Z7GZQkd2+HUVT3+Bz0gMG3KrmJpyveux3GNNZGzE01fcQ4AkPv3u2Qoh49xKIX1UbkOzofMh7W9472BSw/6RkMQu1jbBodxOo4qIWYK32QXTq8ol4P9BqIRa4+am4xGLE20A9GLKvNw+aHAxEbptpAxEu7eNwcfwhimy06CLHS8B/4nqY/YruxPQCx2rM9hDDgwvUGPQSraOvfAbHX9aAo//QgwiBoydqhJdi/FGl8leqx77z7VFTVfLAXYi0fH7xu0Y2onvD2QGw43zx47amzonbM6DsRG3n48PVDNWL3K4sOxObt70347NSFkMafLkI9xY9CVtSX/0hY40+S6A+3EncySMbDkve7wc3ClWnEmrml3Gz7iFz+79EBjXB4SKmbqtc6vX6QBvmG8EeIbmS7/oKbNbXaIUYn0IoKd30Xo91vqVMwdIDb44R+1w57pWsK7kNWeTz0EjfsCnejUM+DE3bmjv296IA9wvMpJdSPDhjyTfhWVwUI+T5arfB8l+iA+qXI3Vh18ujyyB2diMXjPmmE57OuwvPpliLkv23oBCeslomyfEKoy0bYK97EtfByC227cO7TQwxdHtJneCXlUGV0QFeOGPLwfBrR3erRAWUhbdSSqx+eOxypEh1Q2lNCX4jexsPrSDM8n05E2Tw6oMZwX3EuzN3T2glDHohVK9ptJTyfzTf9Dy9DdFBG9Vrj1FX4RVQviWsVGq5m9EnMlkKFZcs0KAWrqKVZvXmR5a6hriw6IHcvtXRNQrdUISqsBqBQr2cRuWWUTuGoLokOiIFqdQMyi1HW5mOZHiCOErbSZUchomrzgNL4qR0C49TaulG3rsPzaQ343CNJ1+IuG68rL0H0gnY164hxGYFcafxBpWBwQtvVnzQV7pOu1LkQg+fhjEKtYXTa77eFr9Xoa3+quJblptJVG7T2p/1XH/MPetEe6lWSB0CUVtEQA6KHncHdRh5jpHCVGB0ZqZ7QIWx6u5qFNmHsuQchAvZQrxS3GBLbnfG5I3fP6IB+7ioxckyaXN2F2xVVc82m1Fx1E3LNmjPSinpElNn8eGJK2KMbE+9LPcHQIMS2eD2ahcfjqkcZoikT6o2D1+plxynw8Hxq18pcBGF+KnyTEHPqWoMlGXpb1N/gvQWWkuw3MMn7DBP5O2/hw1IjHO26X4+FRRr7OvFut7s+umq0qz8qXPq9LLB69dPl/lL+pUI42cfEI/GhdmKCnWVZArXUes2ykzFJmUc2U+ySKSQuYq3sDhEjMYu/CufZ8D32Pbof4dW5G99bxjw/2La5195WkBCP9eA+LBXClxV3sKPMufYOtRmjRyQMGEvPPBFdfYx9/sET3vZLQigIXLwS7qK7iMA3SugnZQTdTgz3y8EkcHtZGKFbEtJsDZjeqEq496Bx+o7PoAJfPYNtir7UiqkZA0mMdYAFUGToSrJCx8IQksD3wAcqvKthRXAbSAp3C3K/760PmRoE8K9zu3OX5YQbg4nOpiREH1eyWO4+0R/7WK1JdnIhhIIPjTNHzHbGDn5haC/MHMJeR4a1hCQ+Ij8hzsw2xnjyRoSEZweuObvuG2kcJHEXwgQ1BqvPC+GGFt3rgl2fIxTShBaEwjMWD59xsMl/wK2wCo7nh4g/9RMxCVZTSCrCIdnQHtgWPmTAzg9XmPsmuXMhCkLjlaEXORKi29wYinCVD5Hw8VjJZRjxk2NO6PMO+MDy3Pj0r49nseAXfPydX64RAjPWUlQqznqzmfIgphsSjo4Ydip0zBj1ffgXvUle1S6EplkQ8iACLyw/GGPpXQh3by/JEVvfTPw977+mPiecQE5G0zMK7oJ+CCFvK+TTj2P8MiMX32yopv5bldAs26HwUH8neUUrCcM19XxCSE44veQXJEFCKG2TirjV2Ijvu+pXEGJoGJrEEf8yVxHSGuFLlRDb4Qi6Veaw7RxLd35Ve5eiDKcxjjGF3HkNuCSE58NNBPzLW6VFAUk1GoKSMIjwqi/InwUu7M5FTzP2SuftD9EOJ15CN2C35nJXwAuhsSe4iYB/4T2NyFn0Lltd9zRSQj/BfAlh+KDcQlsLQvxD3pShD817msQUoeHvv6h5IRzFwv8FP+NowQ8+cPGZqucClYSbJqE4rH0HRWYa+V34aIEjToy9EjRZMeLDXWN+zfw5Tm9wlm0/QoMfUiO+4BGtZHNevuHRAatq3JVLGSa0pR1iGYIBh51reCKip+HnoVKyf0mw7+GEZ2wSc9uYMkpXfWOdfZ8QB8Xiy8HD3s7DI72Pb9X0lVqatBPyI7VIsHEIlhj3YH9HN0MwaP0Ty602aKs0XjnYgb/eFxDfYpQvLsZHVn55euYuy5Q406v0xVsMy4QCEYR+bp0vj4xg/oRoolLmkynY2WKwWz/DZeR4zvtSRASjHduC83rvtXd8E1W+fJpXvoSzjXP0slltVmft9/stLlvCf09hftGJW2Dj4mprHR+P0cw11pBWVPHRbL+fhzhwFK16eTKPlCyu8++3ymVufPaFcf5/k8inkSi5F3Z3Q/tHZA8TYrLejSY4D3X6RsT6TTLG6MC4HRCHfnmA598sZ+Kz/KXF4ie3Ld1RRrMFGExBcrhhvK8/+ZM/+b/L2/Z04i8BzsWHpny0/DSFv23v+2g3kiew1/kBj7PiQ1PW3vViJMrcYcy787PdRp5IvtIxKz60p6ktZOF7DZPc+dluI09H3+dP/78lXH58vPGJ8f+WsJTfQTievx8O6w9h83Ovj+IX/CL+vPtYHw7v8+J8yxH+gh+qhKPz+v3wMivWcXLC3ezw8lFMEK8IJ7PDYXb/9UNjEq8IvmLwjzwy8fuzV7rpTJ497xktyVF29CERIU4gnujp2VvRa0L3hGkiQjyx5sIJN8b2iNcdDw3CSbTidyRXr4HuIOMVLm0yPOyH4dGOeKJcsTXjhYhDf0PKijRUHFPa0pduCE+Dhz+Ld1c8zSuhfKXVT2uEZ6EXUq9uE4ZPKugq52en1C/WgdOYsvz1F6ViRr7FBYjktEBGvjjWQsjXPeLtFl+6iub3hMjUj04ZRqP1368Ix7h86rxuKc6J71qK02fCfKyIeFgef0k0ZRH1eOOb5qtio2efeUjqpqzgaRBCFfV5VTxEkA2jnFCcivyJpc9Xg4Ew4AYC3olO8MUW3IDdk3D0OT/x3OUPzVeIWByJ9cwFEyVmLT8OWyNnFisQTcLl20vKJ7c7PxFvKpCQiHu/+TnrnAQRluHYK1/0J8Vi6b3FPrB8NWZN4gAfOvTqEapdrGRR2EpYypSYCY+1gIR5mHI3zteU5yShxBC1Vbz554umd3/9tpuuU4eZOeEIMtxb8qeoPPzoc7YgUMciKicMl/MThasDMq6mMcTKBV+2i0U7hOw048kSBN9ONYbNNtENnQcV5kBXPgwXtCDENoKrh1Gx+g53X0eQJg6YGVEZoT3brDzCsNsta2m5RLdnYql37gvCBeanx4W31u7H1A6dBxYmvupzjullS8LUw8a/W5VHi095GuZn+KBmO+GY+JDGO0YH2kJ4KAjzvhQjnOWLwCjP3YDaO8gw6gNL5mPxrPlaNC4NLnGle8u/4ho/NWdjC5dwJT2Ni0sV5H1p8y1IJWExsdoWtTQnPOH381shndGFbdzMLf1VudEuY8UJ6RVC3vg35dovDvzYv1gurlcHVhvhB1Q/xrsV3HnhFX0p9jSYPil7GkG4lpuzrQgYOk++g4/vZZf5m+AWDJGD+8u+jxEfq8sSyPhOIPQ9Q552wpd8Lw1fqr8Qkhfc6OouNzEl8wrhFEcLYf4e1m+TjoX8EIOxKHyCLLHbvh1xVZyIP/bNS7PZihMbZwUhjU642TrE8/na2+E7yX/B/LiMh5TgoDfKojRajSqELt4pw6a19Ij/rF4FRsc+W+rOcokO2L4VE/dhkffdeIarhWXF+eTnORfL9+8kSaP35e4clGdxNghxTGcZpOGxBXGw4YRBStPZC5ifwSsf80qrbY775qL5dIZ1RR0Cm4cqsWX7TCvk7aX4iYdvEzwIwKzubEFrtYxgMPIXUbxI/A0PLudN2ghdyvcmOj4jcb6rGtIE6wRmLTxfEv6EF8sbt+5R4mM5O8o1RFtEnJG4WAoP0Hyfaft24icH7XvmZGEMk5zCfJrBjOpY2jNvQZomWerEu4VPHKxST/B7XCTk+7fGjNcCQpZrh/CZxNqh2dMu9gO4vZeN+Mb/OSR3xE0PDuEbNH2qBEQHbe6ZIvuVe9a5Ku+6ySkg9Au0vK3X62LTwOh9vX4vs8kYv8Mk4BUKZglp0Ar4zP97+WCE64SQDHcg4rWgcfoyX0+N8G2fbl5x9oC74pfwW9HodusMciWdK0dy9H7F2F3tVdSuRwcc7mNpCBdXRTQllZTqhWh4WtvYjdrS7dy86lb9B3X8xW3u3tdry3hd/cUVRGTQcB89HjrPle7WF06H4slsHrdF5zG5Di1ndcsqy1DEsx18k5DHOVJcx90GitiOitBrCkFXfKUOlXB3kFz9xZdwgHJ04rdU/stu6XNmqWLLqZ6ROzZq+EiLq4VLUa5+uCMyjvPq3M2bnS3GEp1y6NahkNwtz8pNxqE3cQ3heKe6rnRh1/Yf5Do0vMDzi/OOzdUB5LsyVdEduRTHSVhaVbSfDoVUghMOB8SjOMLuAcYusk+jBNFz0O6hQyEX/8XBnQxGkO01uomoyr18sepX8vB8eieulOLm/ouD74I+4HbYq/pgVmi9AcDwn2E/HQpBN8seR680xBantvTToXNQgCF8QHWOmqiJq3e0jRsqw1Jei8aRG4N1qO6jdZ4CP7Pn+8p/XodK/QOUf6cX/ZM/+ZP/ufwHdbh/HHOMHhkAAAAASUVORK5CYII='
        if (searchType === 'track') {
            image = item.album.images[0].url
        } else if (searchType !== 'track' && item.images.length > 0) {
            image = item.images[0].url
        }
        return ` <li>
        <!--يفضل وضع الصورة كخلفية حتى نستطيع تغيير الحجم من ناحية العرض والطول في نفس الوقت عن طريق background-size-->
        <span
          class="trackPoster"
          style="background-image: url(${image});"
        >
        </span>
        <span class="trackDetails">
          <h4 class="trackTitle">${item.name}</h4>
          <h5 class="trackArtist">${tagLine}</h5>
        </span>
        <span class="trackActions">
          <button class="like">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 3C8.33 1.268 6.453 0 4.5 0C1.957 0 0 1.932 0 4.5C0 8.029 3.793 10.758 9 16C14.207 10.758 18 8.029 18 4.5C18 1.932 16.043 0 13.5 0C11.545 0 9.67 1.268 9 3Z"
              />
            </svg>
            </button><a class="play" href='${item.external_urls.spotify}' target='_blank'></a></span>
            </li>`
    }).join('')
}

document.querySelector('.submitSearch').addEventListener('click', e => {
    e.preventDefault()
    const query = document.querySelector('#searchQuery').value
    const searchType = document.querySelector('#searchType').value
    const limit = 9

    if (query) {
        fetch(`${API_ENDPOINT}?q=${query}&type=${searchType}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            }
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error
                }
                renderData(res, searchType)

            })
            .catch(err => {
                if (err.status === 400 || err.status === 401) {
                    document.location.href = 'http://localhost:8888'
                } else {
                    console.log(err)

                }
            })

    } else {
        return
    }

})


//list or grid
document.querySelector('.switch.grid').addEventListener('click', () => {
    document.querySelector('.switch.grid').classList.add('is-active')
    document.querySelector('.switch.list').classList.remove('is-active')
    document.querySelector('.musicList').classList.add('is-grid')
    document.querySelector('.musicList').classList.remove('is-list')
})
document.querySelector('.switch.list').addEventListener('click', () => {
    document.querySelector('.switch.list').classList.add('is-active')
    document.querySelector('.switch.grid').classList.remove('is-active')
    document.querySelector('.musicList').classList.add('is-list')
    document.querySelector('.musicList').classList.remove('is-grid')
})