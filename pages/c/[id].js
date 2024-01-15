import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";
import Head from "next/head";
import CertificateViewer from "../../components/CertificateViewer";

export default function C(props) {
    const router = useRouter();
    const [id, setID] = useState(router.query.id);

    const [value, setValue] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined" && router.isReady) {
            setID(router.query.id);
        }
    }, [router.isReady, router.query.id]);

    useEffect(() => {
        if (typeof window !== "undefined" && id) {
            firebase
                .firestore()
                .collection("cert")
                .doc(id.split("-").length > 1 ? id.split("-")[0] :
                    (id.startsWith("omarffhj") ?
                        "omarffhj" :
                        (id.startsWith('asd') ? "asd" : "")
                    )
                )                                               // This is a hard coded fix for the old certificates. (Original: id.split("-")[0])
                .collection("core21")
                .doc(id)
                .get()
                .then((doc) => {
                    setValue(doc.data());
                });
        }
    }, [id]);


    return value ? (
        <>
            <Head>
                <title>{`${value.name} - GDSC Certificate`}</title>
                <meta
                    name="title"
                    content={`${value.name} - GDSC Certificate`}
                />
                <meta
                    name="description"
                    content={`Google Developers Student Clubs Certificate`}
                />
                <meta property="og:type" content="article" />
                <meta
                    property="og:url"
                    content={`https://gdsc23-cert.web.app/c/${value.id}`}
                />
                <meta
                    property="og:title"
                    content={`${value.name} - GDSC Certificate`}
                />
                <meta
                    property="og:description"
                    content={`${value.name} - Google Develelopers Student Clubs Certificate`}
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content={`https://gdsc23-cert.web.app/c/${value.id}`}
                />
                <meta
                    property="twitter:title"
                    content={`${value.name} - GDSC Certificate`}
                />
                <meta
                    property="twitter:description"
                    content={`${value.name} - Google Develelopers Student Clubs Certificate`}
                />
            </Head>

            {(id && value) ? <CertificateViewer params={{ id, ...value }}></CertificateViewer> : <>Loading...</>}
        </>
    ) : (
      <div >Not Found</div>
    );
}
