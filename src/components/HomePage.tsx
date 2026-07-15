// Généré par framer-port.mjs — port FIDÈLE du SSR Framer (ne pas reconstruire, brancher Payload sur les noeuds de contenu).
// Styles exacts : importer "framer.css" une seule fois (layout global).
import './framer.css';
import SiteHeader from './ksc/SiteHeader';
import SiteFooter from './ksc/SiteFooter';
import ActusHome from './ksc/ActusHome';
import AvisParents from './ksc/AvisParents';
import { INSCRIPTION_URL } from './ksc/InscriptionCTA';

export default function HomePage() {
  return (
    <>
      <div id={"main"}>
        {/* Header hors du wrapper Framer : à l'intérieur, ce dernier le comprimait
            (1077px au lieu de 1440). Même correctif que pour ActusHome/SiteFooter. */}
        <SiteHeader />
        <div className={"framer-JDlNv framer-oZnZ7 framer-DxfPq framer-OPLWG framer-JIYi9 framer-UiBmF framer-TCv20 framer-72rtr7"} style={{ minHeight: "100vh", width: "auto" }}>
          <div className={"framer-19bh027"} data-framer-name={"Sticky"}>
            <main className={"framer-okomez"} data-framer-name={"Hero"} id={"hero"}>
              <div data-framer-name={"Line-Drawing"} className={"framer-9n5cfh hidden-10l0lpx"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 558 563"}>
                    <use href={"#svg2137278723_743"} />
                  </svg>
                </div>
              </div>
              <div className={"framer-5z5bdx"} data-framer-name={"Content Wrapper"}>
                <div className={"framer-1xaob65"} data-framer-name={"Left"}>
                  <div className={"framer-1h18p9s"} data-framer-name={"Text Wrapper"}>
                    <div className={"framer-11r2m59"} data-framer-name={"Texts"}>
                      <div className={"framer-1cdywco"} data-framer-name={"Titles"}>
                        <div className={"framer-1v0q03u"} style={{ transform: "none" }}>
                          <h1 className={"framer-text framer-styles-preset-tus4j9"} data-styles-preset={"xQ9PSlCb4"}>
                            Le club sport des enfants
                          </h1>
                        </div>
                        <div className={"framer-3jtnr2"} style={{ transform: "none" }}>
                          <h1 className={"framer-text framer-styles-preset-ffc2o1"} data-styles-preset={"OW_EuGa4b"}>
                            Bouger, grandir, s’épanouir
                          </h1>
                        </div>
                      </div>
                      <div className={"framer-1e97lng"} style={{ transform: "none" }}>
                        <p className={"framer-text framer-styles-preset-1d6on7b"} data-styles-preset={"g8rJF4oHh"}>
                          À Rochecorbon, le Kid Sport Club initie les enfants de 10 mois à 14 ans au sport, par le jeu et le mouvement.
                        </p>
                      </div>
                    </div>
                    <div className={"framer-14fluox"} data-framer-name={"Button Wrapper"}>
                      <div className={"ssr-variant"}>
                        <div className={"framer-19ux50q-container"}>
                          <a className={"framer-3qE1p framer-CvaDL framer-TMFp6 framer-1kbhlz5 framer-v-1jxt7ga framer-1hf9a6b"} data-framer-name={"Hero Green"} href={INSCRIPTION_URL} data-inscription={"placeholder"} style={{ "--border-bottom-width": "0px", "--border-color": "rgba(0, 0, 0, 0)", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "solid", "--border-top-width": "0px", backgroundColor: "var(--token-79291dd2-1190-43c1-89c1-42f3d3b2860a, rgb(230, 0, 126))", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
                            <div className={"framer-oof4xq"} style={{ "--extracted-r6o4lv": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-uryPfyK63-rNlYn_Jv1": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-ee3jw3"} data-styles-preset={"d2_XrBlDp"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255)))" }}>
                                S’inscrire
                              </p>
                            </div>
                            <div className={"framer-1lg9yj-container"}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className={"ssr-variant"}>
                        <div className={"framer-cmejpq-container"}>
                          <a className={"framer-3qE1p framer-CvaDL framer-TMFp6 framer-1kbhlz5 framer-v-336m18 framer-1hf9a6b"} data-framer-name={"Secondary "} data-border={"true"} href={"/seance-essai"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-866b3572-5e63-45f6-bc85-ab2ac7b1afe1, rgb(89, 91, 112))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(255, 255, 255, 0)", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
                            <div className={"framer-oof4xq"} style={{ "--extracted-r6o4lv": "var(--variable-reference-uryPfyK63-rNlYn_Jv1)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-uryPfyK63-rNlYn_Jv1": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-ee3jw3"} data-styles-preset={"d2_XrBlDp"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-uryPfyK63-rNlYn_Jv1))" }}>
                                Séance d’essai
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"framer-idlw79"} data-framer-name={"Number Facts"}>
                    <div className={"ssr-variant hidden-10l0lpx"}>
                      <div className={"framer-segth-container"}>
                        <div className={"framer-dmlH3 framer-8LK59 framer-OPLWG framer-1ov783c framer-v-1ov783c"} data-framer-name={"Default"} style={{ height: "100%" }}>
                          <div className={"framer-8xwj3z"} data-framer-name={"Image"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} width={"36"} height={"33"} src={"/assets/framerusercontent.com/images/ZZoUGIEiOU2jSHaCp5Py2kFDc_q80ae45ec.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "contain" }} />
                            </div>
                          </div>
                          <div className={"framer-1ed0fw8"} data-framer-name={"Text"}>
                            <div className={"framer-sqq2et"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-n09wtz"} data-styles-preset={"b4OsDW1aO"}>
                                + de 10
                              </h5>
                            </div>
                            <div className={"framer-cc3bwz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1d6on7b"} data-styles-preset={"g8rJF4oHh"}>
                                Activités proposées
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                      <div className={"framer-segth-container"}>
                        <div className={"framer-dmlH3 framer-8LK59 framer-OPLWG framer-1ov783c framer-v-mi0nib"} data-framer-name={"Mobile"} style={{ width: "100%" }}>
                          <div className={"framer-8xwj3z"} data-framer-name={"Image"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} width={"36"} height={"33"} src={"/assets/framerusercontent.com/images/ZZoUGIEiOU2jSHaCp5Py2kFDc_q80ae45ec.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "contain" }} />
                            </div>
                          </div>
                          <div className={"framer-1ed0fw8"} data-framer-name={"Text"}>
                            <div className={"framer-sqq2et"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-n09wtz"} data-styles-preset={"b4OsDW1aO"}>
                                + de 10
                              </h5>
                            </div>
                            <div className={"framer-cc3bwz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1d6on7b"} data-styles-preset={"g8rJF4oHh"}>
                                Activités proposées
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-10l0lpx"}>
                      <div className={"framer-5fzal4-container"}>
                        <div className={"framer-dmlH3 framer-8LK59 framer-OPLWG framer-1ov783c framer-v-1ov783c"} data-framer-name={"Default"} style={{ height: "100%" }}>
                          <div className={"framer-8xwj3z"} data-framer-name={"Image"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} width={"32"} height={"40"} src={"/assets/framerusercontent.com/images/fuGLtQzyoodqISvCGmpdRp464I_qadc4107e.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "contain" }} />
                            </div>
                          </div>
                          <div className={"framer-1ed0fw8"} data-framer-name={"Text"}>
                            <div className={"framer-sqq2et"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-n09wtz"} data-styles-preset={"b4OsDW1aO"}>
                                + de 600
                              </h5>
                            </div>
                            <div className={"framer-cc3bwz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1d6on7b"} data-styles-preset={"g8rJF4oHh"}>
                                Enfants accueillis par an
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                      <div className={"framer-5fzal4-container"}>
                        <div className={"framer-dmlH3 framer-8LK59 framer-OPLWG framer-1ov783c framer-v-mi0nib"} data-framer-name={"Mobile"} style={{ width: "100%" }}>
                          <div className={"framer-8xwj3z"} data-framer-name={"Image"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} width={"32"} height={"40"} src={"/assets/framerusercontent.com/images/fuGLtQzyoodqISvCGmpdRp464I_qadc4107e.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "contain" }} />
                            </div>
                          </div>
                          <div className={"framer-1ed0fw8"} data-framer-name={"Text"}>
                            <div className={"framer-sqq2et"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-n09wtz"} data-styles-preset={"b4OsDW1aO"}>
                                + de 600
                              </h5>
                            </div>
                            <div className={"framer-cc3bwz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1d6on7b"} data-styles-preset={"g8rJF4oHh"}>
                                Enfants accueillis par an
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"framer-1oxtim0"} data-framer-name={"Image Wrapper"}>
                  <div data-framer-name={"Plane"} className={"framer-1a8u8yt"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                    <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                      <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 69 57"}>
                        <use href={"#svg619412030_1349"} />
                      </svg>
                    </div>
                  </div>
                  <div data-framer-name={"Stars"} className={"framer-zsmc7z"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                    <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                      <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 69 66"}>
                        <use href={"#svg-884819209_2835"} />
                      </svg>
                    </div>
                  </div>
                  <div data-framer-name={"Star"} className={"framer-2nw3pe"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                    <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                      <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 45 46"}>
                        <use href={"#svg968732524_1559"} />
                      </svg>
                    </div>
                  </div>
                  <div className={"ssr-variant"}>
                    <div className={"framer-1mo52hc"} data-framer-name={"Kid Image"}>
                      <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                        <img decoding={"async"} width={"1096"} height={"1164"} sizes={"(min-width: 1440px) 548px, (min-width: 1200px) and (max-width: 1439.98px) 548px, (max-width: 809.98px) 274px, (min-width: 810px) and (max-width: 1199.98px) 378.5155px"} srcSet={"/assets/ksc/hero.webp 964w,/assets/ksc/hero.webp 1096w"} src={"/assets/ksc/hero.webp"} alt={"Enfant qui saute de joie au Kid Sport Club"} style={{ display: "block", width: "100%", height: "112%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center bottom", objectFit: "contain" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <section className={"framer-1bjbsyn"} data-framer-name={"Welcome & Learning "} id={"welcome"}>
              <div className={"framer-13dbkwz"} data-framer-name={"Ticker Wrapper"}>
                <div className={"framer-n8thpo"} data-framer-name={"Ticker"} style={{ overflowX: "clip", display: "flex", position: "relative" }}>
                  <ul role={"group"} draggable={"false"} style={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", flexDirection: "row", gap: "36px", opacity: "0", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%", transform: "translateX(-36px)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", touchAction: "pan-y" }}>
                    <li className={"ticker-item"} aria-hidden={"false"} aria-posinset={"1"} aria-setsize={"6"} style={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}>
                      <div className={"framer-1g5leeu"} style={{ transform: "none" }}>
                        <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} dir={"auto"} style={{ "--framer-text-color": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))" }}>
                          DE 10 MOIS À 14 ANS
                        </h5>
                      </div>
                    </li>
                    <li className={"ticker-item"} aria-hidden={"false"} aria-posinset={"2"} aria-setsize={"6"} style={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}>
                      <div data-framer-name={"Star 5"} className={"framer-7lwfiv"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                        <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                          <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 25 25"}>
                            <use href={"#svg-1252930658_457"} />
                          </svg>
                        </div>
                      </div>
                    </li>
                    <li className={"ticker-item"} aria-hidden={"false"} aria-posinset={"3"} aria-setsize={"6"} style={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}>
                      <div className={"framer-1r34a2u"} style={{ transform: "none" }}>
                        <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} dir={"auto"} style={{ "--framer-text-color": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))" }}>
                          PLACES LIMITÉES
                        </h5>
                      </div>
                    </li>
                    <li className={"ticker-item"} aria-hidden={"false"} aria-posinset={"4"} aria-setsize={"6"} style={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}>
                      <div data-framer-name={"Star 5"} className={"framer-10q9py"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                        <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                          <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 25 25"}>
                            <use href={"#svg-1252930658_457"} />
                          </svg>
                        </div>
                      </div>
                    </li>
                    <li className={"ticker-item"} aria-hidden={"false"} aria-posinset={"5"} aria-setsize={"6"} style={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}>
                      <div className={"framer-1gbrsbw"} style={{ transform: "none" }}>
                        <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} dir={"auto"} style={{ "--framer-text-color": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))" }}>
                          INSCRIPTIONS OUVERTES
                        </h5>
                      </div>
                    </li>
                    <li className={"ticker-item"} aria-hidden={"false"} aria-posinset={"6"} aria-setsize={"6"} style={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}>
                      <div data-framer-name={"Star 5"} className={"framer-1jiajfp"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                        <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                          <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 25 25"}>
                            <use href={"#svg-1252930658_457"} />
                          </svg>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={"framer-kcrf1d"} data-framer-name={"Welcome & Learning"}>
                <div className={"framer-ymypwc"} data-framer-name={"Union"}>
                  <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                    <img decoding={"async"} loading={"lazy"} width={"79"} height={"131"} src={"/assets/framerusercontent.com/images/rqKzz9PpDtlsth4yi8GrW2eaBc_q49817a66.png"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
                <div className={"framer-1cu92lb"} data-framer-name={"Star "}>
                  <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                    <img decoding={"async"} loading={"lazy"} width={"75"} height={"75"} src={"/assets/framerusercontent.com/images/fy7nkCD9bdBRf83DFU0xRVtWZFk_q80f96b68.png"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
                <div className={"framer-6qkmst"} data-framer-name={"Welcome Section"}>
                  <div className={"framer-1rt5g1g"} data-framer-name={"Video"}>
                    <div className={"framer-149wiqx"} data-framer-name={"Rotation"} style={{ transform: "rotate(8deg)" }} />
                    <div className={"framer-1xy87xc"}>
                      <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                        <img decoding={"async"} loading={"lazy"} width={"6016"} height={"4016"} sizes={"(min-width: 1440px) 273px, (min-width: 1200px) and (max-width: 1439.98px) 273px, (min-width: 810px) and (max-width: 1199.98px) 273px, (max-width: 809.98px) 273px"} srcSet={"/assets/ksc/esprit-equipe.webp 512w,/assets/ksc/esprit-equipe.webp 1024w,/assets/ksc/esprit-equipe.webp 2048w,/assets/ksc/esprit-equipe.webp 4096w,/assets/ksc/esprit-equipe.webp 6016w"} src={"/assets/ksc/esprit-equipe.webp"} alt={"Enfants réunis en équipe au Kid Sport Club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                      </div>
                    </div>
                  </div>
                  <div className={"framer-qfctrd"} data-framer-name={"Content Wrapper"}>
                    <div className={"framer-1x04v4a"} data-framer-name={"Text"}>
                      <div className={"framer-1u9nqhi"} data-framer-name={"Title"}>
                        <div className={"framer-7tirx7"} style={{ transform: "none" }}>
                          <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-color": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))" }}>
                            Bienvenue au
                          </h4>
                        </div>
                        <div className={"framer-v2ctbz"} style={{ transform: "none" }}>
                          <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-color": "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))" }}>
                            Kid Sport Club !
                          </h4>
                        </div>
                      </div>
                      <div className={"framer-znpa4w"} style={{ transform: "none" }}>
                        <p className={"framer-text framer-styles-preset-1d6on7b"} data-styles-preset={"g8rJF4oHh"} style={{ "--framer-text-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))" }}>
                          Au Kid Sport Club de Rochecorbon, nous éveillons les enfants au sport dès le plus jeune âge, dans un cadre sécurisé, bienveillant et stimulant. De la baby gym aux stages sportifs, chacun grandit en s’amusant.
                        </p>
                      </div>
                      <div className={"ssr-variant"}>
                        <div className={"framer-31b0pr-container"}>
                          <a className={"framer-3qE1p framer-CvaDL framer-TMFp6 framer-1kbhlz5 framer-v-8xagx7 framer-1hf9a6b"} data-framer-name={"Link"} href={"/qui-sommes-nous"} style={{ "--border-bottom-width": "0px", "--border-color": "rgba(0, 0, 0, 0)", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "solid", "--border-top-width": "0px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                            <div className={"framer-oof4xq"} style={{ "--extracted-r6o4lv": "var(--variable-reference-uryPfyK63-rNlYn_Jv1)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-uryPfyK63-rNlYn_Jv1": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-ee3jw3"} data-styles-preset={"d2_XrBlDp"}>
                                En savoir plus
                              </p>
                            </div>
                            <div className={"framer-1lg9yj-container"}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div data-framer-name={"Lightning Icon "} className={"framer-1afbjog"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                      <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                        <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 79 79"}>
                          <use href={"#svg-1593822655_1047"} />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"framer-1v3rvdc"} data-framer-name={"Bottom content"}>
                  <div className={"framer-qsymft"} data-framer-name={"Title"}>
                    <div className={"framer-flxcpx"} style={{ transform: "none" }}>
                      <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-alignment": "center" }}>
                        Au club
                      </h4>
                    </div>
                    <div className={"framer-ey5sf6"} style={{ transform: "none" }}>
                      <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-alignment": "center" }}>
                        Tranches d’âge
                      </h4>
                    </div>
                  </div>
                  <div className={"framer-6escnl"} data-framer-name={"Card Wrapper"}>
                    <div className={"ssr-variant"}>
                      <div className={"framer-1g4em89-container"}>
                        <div className={"framer-FL2qr framer-JIYi9 framer-5BS8D framer-CvaDL framer-1t6ignn framer-v-1t6ignn"} data-framer-name={"Plain"} style={{ backgroundColor: "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-l6x46p"} data-framer-name={"Icon"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} loading={"lazy"} width={"52"} height={"52"} src={"/assets/framerusercontent.com/images/bbWJEnGhYymFBVabuzs09o6Qqc_qdc6f2d49.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                            </div>
                          </div>
                          <div className={"framer-1qb9nfa"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                              Baby Gym
                            </h5>
                          </div>
                          <div className={"framer-b7bnb9"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              (dès 10 mois)
                            </p>
                          </div>
                          <div className={"framer-ylcyci"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              Dès 10 mois : éveil moteur et sensoriel pour les tout-petits, en douceur et en confiance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"ssr-variant"}>
                      <div className={"framer-ifjdc-container"}>
                        <div className={"framer-FL2qr framer-JIYi9 framer-5BS8D framer-CvaDL framer-1t6ignn framer-v-1t6ignn"} data-framer-name={"Plain"} style={{ backgroundColor: "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-l6x46p"} data-framer-name={"Icon"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} loading={"lazy"} width={"52"} height={"52"} src={"/assets/framerusercontent.com/images/jBoDYQgCkLk6CAuEXmJ8gEKOck_qdc6f2d49.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                            </div>
                          </div>
                          <div className={"framer-1qb9nfa"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                              Les P’tits Sportifs
                            </h5>
                          </div>
                          <div className={"framer-b7bnb9"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              (3 – 5 ans)
                            </p>
                          </div>
                          <div className={"framer-ylcyci"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              De 3 à 5 ans : parcours, motricité et premiers jeux sportifs pour se dépenser et progresser.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"ssr-variant"}>
                      <div className={"framer-tc2qad-container"}>
                        <div className={"framer-FL2qr framer-JIYi9 framer-5BS8D framer-CvaDL framer-1t6ignn framer-v-1t6ignn"} data-framer-name={"Plain"} style={{ backgroundColor: "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-l6x46p"} data-framer-name={"Icon"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} loading={"lazy"} width={"52"} height={"52"} src={"/assets/framerusercontent.com/images/Qygwf6UER9kece3F6FzscSQ4aPA_qdc6f2d49.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                            </div>
                          </div>
                          <div className={"framer-1qb9nfa"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                              Les Sportifs
                            </h5>
                          </div>
                          <div className={"framer-b7bnb9"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              (6 - 10 ans)
                            </p>
                          </div>
                          <div className={"framer-ylcyci"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              De 6 à 10 ans : initiation à de nombreux sports, coordination et esprit d’équipe.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"ssr-variant"}>
                      <div className={"framer-14vkc7v-container"}>
                        <div className={"framer-FL2qr framer-JIYi9 framer-5BS8D framer-CvaDL framer-1t6ignn framer-v-1t6ignn"} data-framer-name={"Plain"} style={{ backgroundColor: "var(--token-ce18055f-bbbe-4a53-a731-e618b46c3b0e, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-l6x46p"} data-framer-name={"Icon"}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                              <img decoding={"async"} loading={"lazy"} width={"52"} height={"52"} src={"/assets/framerusercontent.com/images/2XhKk4BCzfduYK9yQaK2Lagzo_qdc6f2d49.svg"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                            </div>
                          </div>
                          <div className={"framer-1qb9nfa"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                              Les Champions
                            </h5>
                          </div>
                          <div className={"framer-b7bnb9"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              (11 – 14 ans)
                            </p>
                          </div>
                          <div className={"framer-ylcyci"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                              De 11 à 14 ans : perfectionnement, dépassement de soi et préparation physique, dans la bonne humeur.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"ssr-variant"}>
                    <div className={"framer-jhdu3a-container"}>
                      <a className={"framer-3qE1p framer-CvaDL framer-TMFp6 framer-1kbhlz5 framer-v-336m18 framer-1hf9a6b"} data-framer-name={"Secondary "} data-border={"true"} href={"/nos-prestations"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-866b3572-5e63-45f6-bc85-ab2ac7b1afe1, rgb(89, 91, 112))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(255, 255, 255, 0)", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
                        <div className={"framer-oof4xq"} style={{ "--extracted-r6o4lv": "var(--variable-reference-uryPfyK63-rNlYn_Jv1)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-uryPfyK63-rNlYn_Jv1": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", transform: "none" }}>
                          <p className={"framer-text framer-styles-preset-ee3jw3"} data-styles-preset={"d2_XrBlDp"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-uryPfyK63-rNlYn_Jv1))" }}>
                            Voir plus
                          </p>
                        </div>
                        <div className={"framer-1lg9yj-container"}>
                          <div style={{ display: "contents" }} />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className={"framer-1xap5zq"} data-framer-name={"Intersect"} style={{ transform: "translateY(-50%)" }}>
                  <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                    <img decoding={"async"} loading={"lazy"} width={"93"} height={"130"} src={"/assets/framerusercontent.com/images/doLwxGxdJmrOfXL20u6BKTKKxk4_q1c557d70.png"} alt={""} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            </section>
            <section className={"framer-13n12c8"} data-framer-name={"Activities"}>
              <div data-framer-name={"Box"} className={"framer-bmnnku"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 73 73"}>
                    <use href={"#svg433889345_395"} />
                  </svg>
                </div>
              </div>
              <div className={"ssr-variant hidden-10l0lpx hidden-1woy1ar hidden-1z12sqx"}>
                <div className={"framer-hwkem7-container"}>
                  <div className={"framer-5cEWE framer-UiBmF framer-TCv20 framer-1be6lh0 framer-v-1be6lh0"} data-framer-name={"Desktop"} style={{ backgroundColor: "rgb(255, 255, 255)", width: "100%", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                    <div className={"framer-1tfqdn2"} data-framer-name={"Title"}>
                      <div className={"framer-10n0kfd"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-alignment": "center" }}>
                          Au club
                        </h4>
                      </div>
                      <div className={"framer-1mzvsm1"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-alignment": "center" }}>
                          Nos activités
                        </h4>
                      </div>
                    </div>
                    <div className={"framer-2cmd3m"} data-framer-name={"Category Tabs Filters"}>
                      <div className={"framer-zfdw2i"}>
                        <div className={"framer-1nmxlxj-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-o1mt7"} data-border={"true"} data-framer-name={"Active"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-fbb687f5-36a6-434d-ba90-5015fee6487b, rgb(18, 42, 99))", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ "--extracted-r6o4lv": "rgb(255, 255, 255)", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }}>
                                Tout
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Sport
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Anniversaires
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Éveil
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Stages
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"framer-g8cmae"}>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/stages-vacances" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"6000"} height={"4000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/stages-vacances.webp 512w,/assets/ksc/stages-vacances.webp 1024w,/assets/ksc/stages-vacances.webp 2048w,/assets/ksc/stages-vacances.webp 4096w,/assets/ksc/stages-vacances.webp 6000w"} src={"/assets/ksc/stages-vacances.webp"} alt={"Enfants pendant un stage sportif des vacances scolaires"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Stages vacances
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Pendant les vacances scolaires : une semaine d’activités sportives variées et encadrées.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/anniversaire" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"5760"} height={"3840"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/anniversaire.webp 512w,/assets/ksc/anniversaire.webp 1024w,/assets/ksc/anniversaire.webp 2048w,/assets/ksc/anniversaire.webp 4096w,/assets/ksc/anniversaire.webp 5760w"} src={"/assets/ksc/anniversaire.webp"} alt={"Enfants fêtant un anniversaire sportif au club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Anniversaire
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Un anniversaire clé en main : jeux sportifs, gâteau, déco et boissons, jusqu’à 10 enfants.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/mercredis-sportifs" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"3000"} height={"2000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/mercredis-sportifs.webp 512w,/assets/ksc/mercredis-sportifs.webp 1024w,/assets/ksc/mercredis-sportifs.webp 2048w,/assets/ksc/mercredis-sportifs.webp 3000w"} src={"/assets/ksc/mercredis-sportifs.webp"} alt={"Enfants au sport lors des Mercredis Sportifs du club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      Tous âges
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Tous les mercredis
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Mercredis Sportifs
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Tous les mercredis, votre enfant fait du sport au club.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-14iijv0-container"} style={{ transform: "translateX(-50%)" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                <div className={"framer-hwkem7-container"}>
                  <div className={"framer-5cEWE framer-UiBmF framer-TCv20 framer-1be6lh0 framer-v-du0dv8"} data-framer-name={"Phone"} style={{ backgroundColor: "rgb(255, 255, 255)", width: "100%", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                    <div className={"framer-1tfqdn2"} data-framer-name={"Title"}>
                      <div className={"framer-10n0kfd"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-alignment": "center" }}>
                          Au club
                        </h4>
                      </div>
                      <div className={"framer-1mzvsm1"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-alignment": "center" }}>
                          Nos activités
                        </h4>
                      </div>
                    </div>
                    <div className={"framer-2cmd3m"} data-framer-name={"Category Tabs Filters"}>
                      <div className={"framer-zfdw2i"}>
                        <div className={"framer-1nmxlxj-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-o1mt7"} data-border={"true"} data-framer-name={"Active"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-fbb687f5-36a6-434d-ba90-5015fee6487b, rgb(18, 42, 99))", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ "--extracted-r6o4lv": "rgb(255, 255, 255)", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }}>
                                Tout
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Sport
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Anniversaires
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Éveil
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Stages
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"framer-g8cmae"}>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/stages-vacances" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"6000"} height={"4000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/stages-vacances.webp 512w,/assets/ksc/stages-vacances.webp 1024w,/assets/ksc/stages-vacances.webp 2048w,/assets/ksc/stages-vacances.webp 4096w,/assets/ksc/stages-vacances.webp 6000w"} src={"/assets/ksc/stages-vacances.webp"} alt={"Enfants pendant un stage sportif des vacances scolaires"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Stages vacances
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Pendant les vacances scolaires : une semaine d’activités sportives variées et encadrées.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/anniversaire" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"5760"} height={"3840"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/anniversaire.webp 512w,/assets/ksc/anniversaire.webp 1024w,/assets/ksc/anniversaire.webp 2048w,/assets/ksc/anniversaire.webp 4096w,/assets/ksc/anniversaire.webp 5760w"} src={"/assets/ksc/anniversaire.webp"} alt={"Enfants fêtant un anniversaire sportif au club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Anniversaire
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Un anniversaire clé en main : jeux sportifs, gâteau, déco et boissons, jusqu’à 10 enfants.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/mercredis-sportifs" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"3000"} height={"2000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/mercredis-sportifs.webp 512w,/assets/ksc/mercredis-sportifs.webp 1024w,/assets/ksc/mercredis-sportifs.webp 2048w,/assets/ksc/mercredis-sportifs.webp 3000w"} src={"/assets/ksc/mercredis-sportifs.webp"} alt={"Enfants au sport lors des Mercredis Sportifs du club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      Tous âges
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Tous les mercredis
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Mercredis Sportifs
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Tous les mercredis, votre enfant fait du sport au club.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-14iijv0-container"} style={{ transform: "translateX(-50%)" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-10l0lpx hidden-72rtr7 hidden-1z12sqx"}>
                <div className={"framer-hwkem7-container"}>
                  <div className={"framer-5cEWE framer-UiBmF framer-TCv20 framer-1be6lh0 framer-v-1sac8od"} data-framer-name={"Laptop"} style={{ backgroundColor: "rgb(255, 255, 255)", width: "100%", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                    <div className={"framer-1tfqdn2"} data-framer-name={"Title"}>
                      <div className={"framer-10n0kfd"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-alignment": "center" }}>
                          Au club
                        </h4>
                      </div>
                      <div className={"framer-1mzvsm1"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-alignment": "center" }}>
                          Nos activités
                        </h4>
                      </div>
                    </div>
                    <div className={"framer-2cmd3m"} data-framer-name={"Category Tabs Filters"}>
                      <div className={"framer-zfdw2i"}>
                        <div className={"framer-1nmxlxj-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-o1mt7"} data-border={"true"} data-framer-name={"Active"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-fbb687f5-36a6-434d-ba90-5015fee6487b, rgb(18, 42, 99))", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ "--extracted-r6o4lv": "rgb(255, 255, 255)", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }}>
                                Tout
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Sport
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Anniversaires
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Éveil
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Stages
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"framer-g8cmae"}>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/stages-vacances" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"6000"} height={"4000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/stages-vacances.webp 512w,/assets/ksc/stages-vacances.webp 1024w,/assets/ksc/stages-vacances.webp 2048w,/assets/ksc/stages-vacances.webp 4096w,/assets/ksc/stages-vacances.webp 6000w"} src={"/assets/ksc/stages-vacances.webp"} alt={"Enfants pendant un stage sportif des vacances scolaires"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Stages vacances
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Pendant les vacances scolaires : une semaine d’activités sportives variées et encadrées.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/anniversaire" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"5760"} height={"3840"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/anniversaire.webp 512w,/assets/ksc/anniversaire.webp 1024w,/assets/ksc/anniversaire.webp 2048w,/assets/ksc/anniversaire.webp 4096w,/assets/ksc/anniversaire.webp 5760w"} src={"/assets/ksc/anniversaire.webp"} alt={"Enfants fêtant un anniversaire sportif au club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Anniversaire
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Un anniversaire clé en main : jeux sportifs, gâteau, déco et boissons, jusqu’à 10 enfants.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/mercredis-sportifs" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"3000"} height={"2000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/mercredis-sportifs.webp 512w,/assets/ksc/mercredis-sportifs.webp 1024w,/assets/ksc/mercredis-sportifs.webp 2048w,/assets/ksc/mercredis-sportifs.webp 3000w"} src={"/assets/ksc/mercredis-sportifs.webp"} alt={"Enfants au sport lors des Mercredis Sportifs du club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      Tous âges
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Tous les mercredis
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Mercredis Sportifs
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Tous les mercredis, votre enfant fait du sport au club.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-14iijv0-container"} style={{ transform: "translateX(-50%)" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-10l0lpx hidden-1woy1ar hidden-72rtr7"}>
                <div className={"framer-hwkem7-container"}>
                  <div className={"framer-5cEWE framer-UiBmF framer-TCv20 framer-1be6lh0 framer-v-qviv75"} data-framer-name={"Tablet"} style={{ backgroundColor: "rgb(255, 255, 255)", width: "100%", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                    <div className={"framer-1tfqdn2"} data-framer-name={"Title"}>
                      <div className={"framer-10n0kfd"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-alignment": "center" }}>
                          Au club
                        </h4>
                      </div>
                      <div className={"framer-1mzvsm1"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                        <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-alignment": "center" }}>
                          Nos activités
                        </h4>
                      </div>
                    </div>
                    <div className={"framer-2cmd3m"} data-framer-name={"Category Tabs Filters"}>
                      <div className={"framer-zfdw2i"}>
                        <div className={"framer-1nmxlxj-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-o1mt7"} data-border={"true"} data-framer-name={"Active"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-fbb687f5-36a6-434d-ba90-5015fee6487b, rgb(18, 42, 99))", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ "--extracted-r6o4lv": "rgb(255, 255, 255)", transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }}>
                                Tout
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Sport
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Anniversaires
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Éveil
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={"framer-19kr705-container"}>
                          <div className={"framer-gEYBK framer-5BS8D framer-1hz7il4 framer-v-1hz7il4"} data-border={"true"} data-framer-name={"Default"} data-highlight={"true"} tabIndex={"0"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}>
                            <div className={"framer-13ih88m"} data-framer-name={"Title"} style={{ transform: "none" }}>
                              <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"} dir={"auto"}>
                                Stages
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"framer-g8cmae"}>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/stages-vacances" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"6000"} height={"4000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/stages-vacances.webp 512w,/assets/ksc/stages-vacances.webp 1024w,/assets/ksc/stages-vacances.webp 2048w,/assets/ksc/stages-vacances.webp 4096w,/assets/ksc/stages-vacances.webp 6000w"} src={"/assets/ksc/stages-vacances.webp"} alt={"Enfants pendant un stage sportif des vacances scolaires"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Stages vacances
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Pendant les vacances scolaires : une semaine d’activités sportives variées et encadrées.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/anniversaire" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"5760"} height={"3840"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/anniversaire.webp 512w,/assets/ksc/anniversaire.webp 1024w,/assets/ksc/anniversaire.webp 2048w,/assets/ksc/anniversaire.webp 4096w,/assets/ksc/anniversaire.webp 5760w"} src={"/assets/ksc/anniversaire.webp"} alt={"Enfants fêtant un anniversaire sportif au club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      3 – 14 ans
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Créneaux : nous consulter
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Anniversaire
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Un anniversaire clé en main : jeux sportifs, gâteau, déco et boissons, jusqu’à 10 enfants.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-fbic46"}>
                        <a href="/nos-prestations/mercredis-sportifs" style={{ display: "contents", color: "inherit", textDecoration: "none" }}>
                        <div className={"framer-13ykv9g-container"}>
                          <div className={"framer-KYYqf framer-M1e60 framer-JIYi9 framer-5BS8D framer-k4bzjz framer-v-k4bzjz"} data-border={"true"} data-framer-name={"Variant 1"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                            <div className={"framer-1h2isy7"} data-framer-name={"Image"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }}>
                                <img decoding={"async"} width={"3000"} height={"2000"} sizes={"(min-width: 1440px) calc(max((min(max(100vw, 1px) - 240px, 1440px) - 60px) / 3, 50px) - 48px), (max-width: 809.98px) calc(max(min(max(100vw, 1px) - 40px, 1440px), 50px) - 48px), (min-width: 1200px) and (max-width: 1439.98px) calc(max((min(max(100vw, 1px) - 120px, 1440px) - 60px) / 3, 50px) - 48px), (min-width: 810px) and (max-width: 1199.98px) calc(max((min(max(100vw, 1px) - 80px, 1440px) - 30px) / 2, 50px) - 48px)"} srcSet={"/assets/ksc/mercredis-sportifs.webp 512w,/assets/ksc/mercredis-sportifs.webp 1024w,/assets/ksc/mercredis-sportifs.webp 2048w,/assets/ksc/mercredis-sportifs.webp 3000w"} src={"/assets/ksc/mercredis-sportifs.webp"} alt={"Enfants au sport lors des Mercredis Sportifs du club"} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} />
                              </div>
                            </div>
                            <div className={"framer-1sonb3u"} data-framer-name={"Text Wrapper"}>
                              <div className={"framer-16viq9n"} data-framer-name={"Day & Time"}>
                                <div className={"framer-o7cd2u"} data-framer-name={"Day"}>
                                  <div className={"framer-1homctf"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "left" }}>
                                      Tous âges
                                    </p>
                                  </div>
                                </div>
                                <div className={"framer-cz0ytf"} data-framer-name={"Time"}>
                                  <div className={"framer-lqgpqt"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                    <p className={"framer-text framer-styles-preset-14a4ztw"} data-styles-preset={"Fu4PEkdvq"} style={{ "--framer-text-alignment": "right" }}>
                                      Tous les mercredis
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={"framer-nal0mo"} data-framer-name={"Title"}>
                                <div className={"framer-1kqngu6"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"}>
                                    Mercredis Sportifs
                                  </h5>
                                </div>
                                <div className={"framer-19r7sbz"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                  <p className={"framer-text framer-styles-preset-1k2s06t"} data-styles-preset={"uXoMYZPg0"}>
                                    Tous les mercredis, votre enfant fait du sport au club.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                      </div>
                      <div className={"framer-14iijv0-container"} style={{ transform: "translateX(-50%)" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div data-framer-name={"Star"} className={"framer-15ki5wd"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 25 25"}>
                    <use href={"#svg1371842836_457"} />
                  </svg>
                </div>
              </div>
            </section>
            <section className={"framer-sqkxnh"} data-framer-name={"FAQ"}>
              <div className={"framer-8mor2s"} data-framer-name={"Container"}>
                <div className={"framer-4g13wg"} data-framer-name={"Title"}>
                  <div className={"framer-ra753j"} style={{ transform: "none" }}>
                    <h4 className={"framer-text framer-styles-preset-10ofw0b"} data-styles-preset={"Ks8ax5XhD"} style={{ "--framer-text-alignment": "center", "--framer-text-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))" }}>
                      Questions
                    </h4>
                  </div>
                  <div className={"framer-1pdiwyq"} style={{ transform: "none" }}>
                    <h4 className={"framer-text framer-styles-preset-1fruokq"} data-styles-preset={"oeKkMxxkx"} style={{ "--framer-text-alignment": "center", "--framer-text-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))" }}>
                      fréquentes
                    </h4>
                  </div>
                </div>
                <div className={"framer-1m45jpu"}>
                  <div className={"framer-1lgj23h"}>
                    <div className={"ssr-variant hidden-10l0lpx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-17jmyw"} data-border={"true"} data-framer-name={"Close"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                Puis-je assister à une séance d’essai avant de m’inscrire ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-rr125s"} data-border={"true"} data-framer-name={"Phone Closed"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                Puis-je assister à une séance d’essai avant de m’inscrire ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={"framer-1lgj23h"}>
                    <div className={"ssr-variant hidden-10l0lpx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-17jmyw"} data-border={"true"} data-framer-name={"Close"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                À partir de quel âge mon enfant peut-il commencer ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-rr125s"} data-border={"true"} data-framer-name={"Phone Closed"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                À partir de quel âge mon enfant peut-il commencer ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={"framer-1lgj23h"}>
                    <div className={"ssr-variant hidden-10l0lpx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-17jmyw"} data-border={"true"} data-framer-name={"Close"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                Comment organiser l’anniversaire de mon enfant chez vous ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-rr125s"} data-border={"true"} data-framer-name={"Phone Closed"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                Comment organiser l’anniversaire de mon enfant chez vous ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={"framer-1lgj23h"}>
                    <div className={"ssr-variant hidden-10l0lpx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-17jmyw"} data-border={"true"} data-framer-name={"Close"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                Proposez-vous des stages pendant les vacances scolaires ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={"ssr-variant hidden-1woy1ar hidden-72rtr7 hidden-1z12sqx"}>
                      <div className={"framer-1lj6kr1-container"}>
                        <a href={"/faq"} className={"framer-Ewg2r framer-JIYi9 framer-5BS8D framer-17jmyw framer-v-rr125s"} data-border={"true"} data-framer-name={"Phone Closed"} data-highlight={"true"} tabIndex={"0"} style={{ textDecoration: "none", color: "inherit", "--border-bottom-width": "1px", "--border-color": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-c2e34719-b7f3-48fe-b6dc-c98270809dd0, rgb(248, 251, 254))", width: "100%", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                          <div className={"framer-leylit"} data-framer-name={"Top"}>
                            <div className={"framer-168rtzx"} style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <h5 className={"framer-text framer-styles-preset-1pa5d9r"} data-styles-preset={"kvcB0mldQ"} style={{ "--framer-text-alignment": "left" }}>
                                Proposez-vous des stages pendant les vacances scolaires ?
                              </h5>
                            </div>
                            <div className={"framer-4cf4mj-container"} style={{ transform: "none" }}>
                              <div style={{ display: "contents" }} />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%", paddingTop: "16px" }}>
                  <a className={"framer-3qE1p framer-CvaDL framer-TMFp6 framer-1kbhlz5 framer-v-336m18 framer-1hf9a6b"} data-framer-name={"Secondary "} data-border={"true"} href={"/faq"} style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-866b3572-5e63-45f6-bc85-ab2ac7b1afe1, rgb(89, 91, 112))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgba(255, 255, 255, 0)", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
                    <div className={"framer-oof4xq"} style={{ "--extracted-r6o4lv": "var(--variable-reference-uryPfyK63-rNlYn_Jv1)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-uryPfyK63-rNlYn_Jv1": "var(--token-b3069982-89a8-4b09-8494-b9ff6cfd0669, rgb(8, 22, 70))", transform: "none" }}>
                      <p className={"framer-text framer-styles-preset-ee3jw3"} data-styles-preset={"d2_XrBlDp"} style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-uryPfyK63-rNlYn_Jv1))" }}>
                        Toutes les questions
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div data-framer-name={"Intersect"} className={"framer-1ok0wro"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 65 130"}>
                    <use href={"#svg2112573605_927"} />
                  </svg>
                </div>
              </div>
              <div data-framer-name={"Union"} className={"framer-15nzl37"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 77 131"}>
                    <use href={"#svg-1994336551_1324"} />
                  </svg>
                </div>
              </div>
              <div data-framer-name={"Star "} className={"framer-lnuq4o"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 25 25"}>
                    <use href={"#svg1371842836_457"} />
                  </svg>
                </div>
              </div>
              <div data-framer-name={"Ellipse "} className={"framer-89oilq"} aria-hidden={"true"} style={{ imageRendering: "pixelated", flexShrink: "0", fill: "black", color: "black" }}>
                <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%" }} viewBox={"0 0 24 24"}>
                    <use href={"#svg-126777974_148"} />
                  </svg>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Sections hors wrapper Framer (il comprimerait leur largeur) — même correctif que ActusHome/SiteFooter. */}
        <AvisParents />
        <ActusHome />
        <SiteFooter />
        <div id={"overlay"} />
      </div>
    </>
  );
}
