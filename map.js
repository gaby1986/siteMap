let enviroment = "",
    pages = [];
esURLValida(window.location.href);
const email = "" != vsm.session.email ? vsm.session.email : "",
    idUser = "" != vsm.session.id ? vsm.session.id : "",
    userName = "" != vsm.session.title ? vsm.session.title : "",
    isSuscriber = site.session.isSuscriber() && null != site.session ? "Suscriptor" : "Usuario";
let dateTime = new Date();
dateTime = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} - hora ${dateTime.getHours()}:${dateTime.getMinutes()}`;
let isMatch = !1,
    url = "",
    globalZones = [
        { name: "Header", selector: "#page-header" },
        { name: "Footer", selector: "#page-footer" },
    ],
    globalListeners = [
        { class: "#page-header-session-box .sign-in-button", labelName: "Botón Ingresar" },
        { class: "#page-header-middle .b-suscription", labelName: "Botón Suscribite" },
        { class: ".svg-icon.menu", labelName: "Botón MENU sitio" },
        { class: ".session.with-avatar", labelName: "Botón MENU mi perfil" },
        { class: ".session-options li:nth-child(2) a", labelName: "Botón MI PERFIL" },
        { class: "#main-menu ul li a", labelName: "TAGS" },
        { class: ".piece.markets.standard ul li", labelName: "TICKERS" },
    ],
    homeListeners = [
        { class: ".section article.item", labelName: "" },
        { class: ".sectionfull article.item", labelName: "" },
        { class: "article.locked", labelName: "Article Member from Home" },
        { class: ".columnists .items article.item", labelName: "Clumnists from Home" },
    ],
    payWallListeners = [
        { class: ".page.suscripciones a.logo", labelName: "Botón - Header Logo El Cronista from Pay Wall" },
        { class: ".suscripcion .items .item .button", labelName: "Quiero suscribirme" },
        { class: ".suscripcion .items .item .list_items", labelName: "Botón - Mostrar detalles de  planes" },
        { class: "#page-header-session-box .sign-in-button", labelName: "Botón Ingresar From Pay wall" },
        { class: ".otros-planes .otros-planes__item:first-child p a", labelName: "Botón - Plan Jubilado" },
        { class: ".otros-planes .otros-planes__item:nth-child(2) p a", labelName: "Botón - Plan Estudiante" },
        { class: ".page.suscripciones .whatsapp-wrapper", labelName: "Botón Whatsapp from Pay Wall" },
        { class: ".footer-footer a:first-child", labelName: "Botón Terminos y condiciones from Pay Wall" },
        { class: ".footer-footer a:nth-child(2)", labelName: "Botón Precios vigentes from Pay Wall" },
    ],
    articleListeners = [
        { class: "nav.breadcrumb ol li a span", labelName: "Breadcrumb" },
        { class: ".speakText", labelName: "Botón Escuchar" },
        { class: "#content-share", labelName: "Botón Compartir" },
        { class: ".more-list .whatsapp", labelName: "Botón Compartir whatsapp" },
        { class: ".more-list .facebook", labelName: "Botón Compartir facebook" },
        { class: ".more-list .twitter", labelName: "Botón Compartir twitter" },
        { class: ".more-list .linkedIn", labelName: "Botón Compartir linkedIn" },
        { class: ".more-list .email", labelName: "Botón Compartir email" },
        { class: ".more-list .comments", labelName: "Botón Compartir comments" },
        { class: "#bookmark", labelName: "Botón Guardar" },
        { class: ".b-suscription-full", labelName: "Botón/Caja: Queremos que seas parte de Members" },
    ],
    homeInteractions = { name: "Home" },
    payWallInteractions = { name: "PayWall" };
const home = new PageType("Home", "cronista.com", homeInteractions, homeListeners, !1),
    payWall = new PageType("PayWall", "cronista.com/suscripciones", payWallInteractions, payWallListeners, !1);
if (document.querySelector("#pagecontent .news") || document.querySelector("#pagecontent .news-minisite") || document.querySelector("#pagecontent .news-es") || document.querySelector("#pagecontent .news-mx")) {
    const metaTag = document.querySelector('meta[property="og:image"]');
    let e = {
            name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
            catalogObject: {
                type: "Article",
                id: window.cronistaDataLayer[0].articleProperty.id,
                attributes: {
                    url: window.location.href,
                    name: SalesforceInteractions.resolvers.fromSelector("#content-title"),
                    description: SalesforceInteractions.resolvers.fromSelector(".description"),
                    imageUrl: metaTag ? metaTag.getAttribute('content') : null,
                    articleId: window.cronistaDataLayer[0].articleProperty.id.toString(),
                    seccion: window.cronistaDataLayer[0].articleProperty.category,
                    articleTitle: SalesforceInteractions.resolvers.fromSelector("#content-title"),
                    publishDate: SalesforceInteractions.resolvers.fromSelector(".author-date time"),
                    authorName: window.cronistaDataLayer[0].articleProperty.authorName,
                    canonicalUrl: window.cronistaDataLayer[0].articleProperty.canonica,
                    accessCondition: window.cronistaDataLayer[0].articleProperty.conditionsOfAccess,
                },
            },
        },
        a = new PageType("Article", window.location.href, e, articleListeners, document.querySelector("#pagecontent .news"));
    console.log(a.interaction), pages.push(a);
}
function Pages() {
    return pages.push(home, payWall), pages;
}
function PageType(e, a, t, s, l) {
    (this.name = e),
        (this.isMatch = () => {
            let e = window.location.href;
            return e.includes("?") && (e = e.slice(0, window.location.href.lastIndexOf("?"))), "/" === e.charAt(e.length - 1) && (e = e.slice(0, window.location.href.lastIndexOf("/"))), (isMatch = !!l || e === `${enviroment}${a}`);
        }),
        (this.interaction = t),
        (this.listeners = GenerateListeners(e, s)),
        "PayWall" == e && (this.onActionEvent = (e) => PayWallActions(e));
}
function PayWallActions(e) {
    let a = new URL(window.location.href).searchParams.get("limit");
    if (((e.user = e.user || {}), (e.user.attributes = e.user.attributes || {}), null != a)) {
        const t = "true" === a;
        e.user.attributes.typeOfEntry = t ? "choque metered" : "choque exclusivo";
        let s = new URL(window.location.href).searchParams.get("continue");
        e.user.attributes.continueUrl = s;
    } else e.user.attributes.typeOfEntry = "Choque directo";
    return e;
}
function ReadHomeBlocks(e) {
    let a = document.querySelector(".main-container"),
        t = a.childNodes[0].querySelectorAll("article.item"),
        s = a.childNodes[2].querySelectorAll("article.item");
    sendDataFromHomeBlocks("Click, Article from home (Bloque1)", e, t), sendDataFromHomeBlocks("Click, Article from home (Bloque2)", e, s);
}
function sendDataFromHomeBlocks(e, a, t) {
    for (let s = 0; s < t.length; s++)
        if (a === t[s]) {
            SalesforceInteractions.sendEvent({ interaction: { name: e }, user: { identities: { emailAddress: email }, attributes: { name: userName } } });
            break;
        }
}
function ReadGlobalEvents(e, a) {
    let t = a.labelName;
    ("TICKERS" != a.labelName && "TAGS" != a.labelName) || (t = a.labelName + ": " + SalesforceInteractions.cashDom(e.target).text()),
        "Quiero suscribirme" == a.labelName && (t = "Botón: " + a.labelName + ": " + SalesforceInteractions.cashDom(e.target.parentNode.querySelector(".title")).text()),
        "Breadcrumb" == a.labelName && (t = a.labelName + ": " + SalesforceInteractions.cashDom(e.target).text()),
        SalesforceInteractions.sendEvent({ interaction: { name: t, attributes: { userIdCms: idUser, name: userName, lastName: userName, isSuscriber: isSuscriber, emailAddress: email, continueUrl: url } } });
}
function GenerateContentZones(e) {
    let a = [];
    if (e.length > 0)
        for (let t = 0; t < e.length; t++) {
            let s = { name: e[t].name, selector: e[t].selector };
            a.push(s);
        }
    return a;
}
function GenerateListeners(e, a) {
    let t = [];
    if (a.length > 0)
        for (let s = 0; s < a.length; s++)
            if ("Home" != e || (a[s].class != a[0].class && a[s].class != a[1].class)) {
                let e = SalesforceInteractions.listener("click", `${a[s].class}`, (e) => {
                    e.preventDefault(), ReadGlobalEvents(e, a[s]), e.stopPropagation();
                });
                t.push(e);
            } else {
                let e = SalesforceInteractions.listener("click", a[s].class, (e) => {
                    ReadHomeBlocks(e.currentTarget);
                });
                t.push(e);
            }
    return t;
}
function esURLValida(e) {
    var a = e.match(/^https:\/\/(?:dev|qa|www)\./i);
    enviroment = a[0];
}
