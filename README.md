# 포켓몬 도감.

![로고](https://github.com/seo-ha/pokemon/blob/main/src/assets/portfolio.jpg)
+ Next.js, Pokemon.api를 이용한 포켓몬 도감입니다.
+ 링크 : https://seo-ha.github.io/portfolio/
<br/>

# 목차
+ [홈페이지 설명](#홈페이지-설명)
+ [문제 해결](#문제-해결)
+ [작업 화면](#작업-화면)
<br/>

## 홈페이지 설명
포켓몬 1기의 포켓몬 도감입니다.

애니에 나오는 포켓몬 도감의 모양을 모티브로 만들었으며, Components의 재활용을 높혔습니다.

+ axios로 원하는 데이터를 받아왔습니다.
+ filter를 사용해 원하는 포켓몬을 찾을 수 있습니다.
+ 선택한 포켓몬에 선택효과를 줬습니다.
+ infiniteScroll을 사용해 스크롤을 했을 때 데이터를 더 불러오도록 했습니다.
<br/>

## 문제 해결

💥 하나의 함수만의 사용해 리스트, 상세의 데이터를 모두 가져와서 로딩속도가 느려졌다.

🍀 리스트의 데이터만을 가져와서 로딩속도를 높혔으며 상세페이지는 선택한 포켓몬의 아이디를 함수에 props해서 데이터를 받아왔다.

</br>

💥💥 최초로 정해진 갯수의 데이터만을 가져오며 스크롤을 했을 때만 정해진 갯수의 데이트를 더 가져오기 때문에 검색을 했을 때 원하는 포켓몬이 안 나오는 현상이 나타났다.

🍀🍀 두개의 함수를 만들어 리스트는 정해진 갯수만을 가져오고 검색은 151개의 모든 데이터를 받아오도록 했습니다.

<br/>

## 작업 화면

### Main
![main](https://github.com/seo-ha/pokemon/blob/main/src/assets/portfolio_1.png)
<br/>

### 검색화면
![work](https://github.com/seo-ha/pokemon/blob/main/src/assets/portfolio_2.png)

