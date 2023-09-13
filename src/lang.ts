/**
 * Ottiene il contenuto di un json di traduzione in base a url e lingua.
 *
 * ( _Funziona anche se l'url contiene una lingua differente da quella specificata_ )
 */
export async function getTranslation(url: URL, lang?: "it" | "en") {
  let { lang: currLang, pathname: currPathname } = getUrlInfo(url);
  if (currPathname.endsWith("/")) {
    currPathname += "index";
  }
  currPathname = currPathname.slice(1);
  const translation = (
    await import(`./lang/${currPathname}/${lang || currLang}.json`).catch(
      (e) => {
        console.error(e);
        throw new Error(
          `Translation not found for "${currPathname}" page, in language "${
            lang || currLang
          }"`
        );
      }
    )
  )?.default;
  const misc = await import(`./lang/misc/${lang || currLang}.json`);
  return { ...translation, misc };
}

/**
 * crea un link a una traduzione a partire da un pathname generico e dalla lingua
 */
export function getLangLink(pathname: string, lang: "it" | "en") {
  if (lang == "en") {
    return pathname;
  } else {
    return "/" + lang + pathname;
  }
}

/**
 * ritorna il pathname generico e la lingua di un url
 */
export function getUrlInfo(url: URL): { lang: "it" | "en"; pathname: string } {
  const lang = getUrlLang(url);
  let pathname = url.pathname;
  if (lang !== "en") {
    pathname = url.pathname.replace(`/${lang}`, "") || "/";
  }
  if (pathname != "/" && pathname.endsWith("/"))
    pathname = pathname.slice(0, -1);
  return {
    lang: lang,
    pathname,
  };
}

/**
 * ritorna la lingua di un url
 */
export function getUrlLang(url: URL) {
  const firstUrlChunk = url.pathname.split("/")[1];
  if (firstUrlChunk == "it") {
    return "it";
  } else {
    return "en";
  }
}
