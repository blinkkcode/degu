import { objectf } from '../objectf/objectf';

/**
 * Utility classes for url manipulation.
 */
export class urlParams {


    /**
     * Checks if a given param is present in the url AND is set to 'true'
     *
     * ```
     * urlParams.isTrue('sup');
     *
     * // http://mydomain.com?sup=true --> true
     * // http://mydomain.com?hello&sup=true  --> true
     *
     * // http://mydomain.com --> false
     * // http://mydomain.com?sup --> false
     * // http://mydomain.com?sup=false --> false
     * ```
     */
    static isTrue(paramName: string): boolean {
        let param = window.location.search.split(paramName + '=')[1];
        param = param && param.split('&')[0];
        return param == 'true';
    }

    /**
     * Checks if a given param is present in the url AND is set to 'true'
     *
     * ```
     * urlParams.getValue('sup');
     *
     * // http://mydomain.com?sup=hello --> hello
     * // http://mydomain.com?hello&sup=hello  --> hello
     *
     * // http://mydomain.com --> null
     * // http://mydomain.com?sup --> null
     * ```
     */
    static getValue(paramName: string): string {
        let param = window.location.search.split(paramName + '=')[1];
        param = param && param.split('&')[0];
        return param || null;
    }


    /**
     * Updates the current URL params with the provided value.
     * Uses history.replaceState.
     *
     * ```
     * // http://mydomain.com/mypage/
     * urlParams.setValue('name', 'Scott');
     * // http://mydomain.com/mypage/?name=Scott
     * ```
     */
    static setValue(paramName:string, value:string) {
        var url = new URL(window.location.href);
        console.log(window.location.href);
        url.searchParams.set(paramName, value);
        if(window.history.replaceState) {
          window.history.replaceState({}, null, url.toString());
        }
    }



    /**
     * Updates the current URL params and removes a parameter.
     * Uses history.replaceState.
     *
     * ```
     * // http://mydomain.com/mypage/?name=Scott
     * urlParams.removeParam('name');
     * // http://mydomain.com/mypage/
     * ```
     */
    static removeParam(paramName:string) {
        var url = new URL(window.location.href);
        url.searchParams.delete(paramName);
        if(window.history.replaceState) {
          window.history.replaceState({}, null, url.toString());
        }
    }


    /**
     * Allows you to loop through each url param.
     *
     * ```
     * Given: mydomain.com?name=scott&location=mars
     *
     * const params = urlParams.asObject(window.location.search);
     *
     * console.log(params); // { name: "scott", location: "mars"}
     *
     * ```
     * @param callback
     */
    static asObject(url: string): Object {
        const query = url.substr(1);
        let result = {};
        query.split("&").forEach((section: any) => {
            let item = section.split("=");

            if (item[0] == "") {
                return;
            }

            result[item[0]] = decodeURIComponent(item[1]);
        });

        return result;
    }



    /**
     * Appends the current url params to the href values of a list
     * of anchor elements.
     *
     *
     * ```
     *   urlParams.appendUrlParamsToLinks(
     *     Array.from(document.querySelectorAll('a'))
     *   )
     * ```
     * @param elements
     */
    static appendUrlParamsToLinks(elements: Array<HTMLAnchorElement>) {
        if ('URLSearchParams' in window) {
            const params = urlParams.asObject(window.location.search);
            elements.forEach((el:HTMLAnchorElement) => {

                // Don't process for links with href.
                if(!el.href) {
                    return;
                }

                let url = new URL(el.href);
                objectf.forEach(params, (key: string, value: string) => {
                    let params = new URLSearchParams(url.search.slice(1));
                    // Only append if it doesn't exist.
                    if (!url.searchParams.has(key)) {
                        url.searchParams.append(key, value);
                    }
                })
                el.href = url.toString();
            })
        }
    }

}