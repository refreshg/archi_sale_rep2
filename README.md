# სრული გაყიდვების რეპორტი

CRM-დან (Bitrix24) ჩატვირთავს **WON** გარიგებებს pipeline `0`-ში და აჩვენებს:

- **ქართველი** — ველი `UF_CRM_1686570871` = საქართველო (ID `3523`)
- **უცხოელი** — ყველა სხვა მნიშვნელობა (ცარიელი ველიც უცხოელად ითვლება)
- **ემიგრანტი** — `UF_CRM_1695303297396` = კი (ID `4386`)
- **ქვეყანა** — `UF_CRM_1686570871`
- **გაყიდვის არხი** — `UF_CRM_1711966229` (dropdown-ის სახელი IBLOCK 170-დან)
- **სააგენტო** — არხის ID `3352225`

პერიოდი: `BEGINDATE` (კონტრაქტის თარიღი). ნაგულისხმევი — მიმდინარე თვე. დეტალური ცხრილი — **50 ჩანაწერი გვერდზე** (წინა / შემდეგი).

### არხის სახელები

Webhook-ს სჭირდება **lists** + **iblock** უფლება (ახლა მხოლოდ `crm` + `user` აქვს). Bitrix24 → Incoming webhook → Permissions.

```bash
npm run sync-channels   # ჩამოტვირთავს data/channels.json
npm run build
```

ან ხელით: `data/channels.json` → `"3420366": "სახელი"`.
## გაშვება

```bash
npm install
npm run build
npm start
```

გახსენით http://localhost:3000

## API

`https://crm.archi.ge/rest/1/1tol0pczy0mvbzmu/crm.deal.list.json`

ფილტრები: `CATEGORY_ID=0`, `STAGE_ID=WON`, `>=BEGINDATE`, `<=BEGINDATE`
