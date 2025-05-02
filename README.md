# PROMT DATA SERCHER
A spider to collect promtdata from scholar articles

```mermaid
flowchart LR
    K(user)
    I[Proxy Server]
    J[LLM Server]
    L[web spider]
    M[SQL Server]

    K <--> I <--> J
    I <--> L
    I <--> M
    
    style I fill:#00CC55, stroke:#877a71, stroke-width:2px, color:#ffffff
    style J fill:#e9b41b, stroke:#877a71, stroke-width:2px, color:#ffffff
    style L fill:#007CEB, stroke:#877a71, stroke-width:2px, color:#ffffff
    style M fill:#EB0004, stroke:#877a71, stroke-width:2px, color:#ffffff

```

```mermaid
flowchart TD

    A[前端] -->|request使用者搜尋| B[Proxy Server
    網頁 Server]
    B -->|request查尋資料| C[SQL Server]
    C -->|Feed back有無資料| B
    B -..- |判斷|D{SQL Server 有無資料}
    D -->|SQL Server 無資料|E[爬蟲 API Server]
    D -->|SQL Server 有資料| A
    E <--->|爬取資料| F[google 學術...]
    E --> |處理成 TEXT| G[LLM Server
    promot: 從 Text 解析輸出固定格式DATA
    e.g. json格式]
    G --->|整理後資料| H{整理資料
    更新資料庫存檔}
    H -.-|整理資料
    判斷是否更新資料庫| B
    H --> |更新資料庫|C
    H --> A


    
    style B fill:#00CC55, stroke:#877a71, stroke-width:2px, color:#ffffff
    style D fill:#00CC55, stroke:#877a71, stroke-width:2px, color:#ffffff
    style H fill:#00CC55, stroke:#877a71, stroke-width:2px, color:#ffffff

    
    style G fill:#e9b41b, stroke:#877a71, stroke-width:2px, color:#ffffff

    style C fill:#EB0004, stroke:#877a71, stroke-width:2px, color:#ffffff

    style E fill:#007CEB, stroke:#877a71, stroke-width:2px, color:#ffffff

    Z{抽象概念}
    Y[實體設備]
```

# BUILD (Windows)
## install execution environment
> [GIT](https://git-scm.com/)

> [nodejs](https://nodejs.org/en)
## clone repositorie
```
git clone https://github.com/FUBUKINGFOX/promptdata.git
```
```
cd ./promptdata
```
## import module 
```
npm update
```
## setting config folder
### Rename following file
> API.example.ini ==> API.ini

> server_setting.example.ini ==> server_setting.ini

> spider.example.ini ==> spider.ini

## start the spider
```
node ./main.js
```

# License
> [MIT](./LICENSE)
