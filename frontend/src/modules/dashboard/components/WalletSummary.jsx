import {
  Wallet,
  Landmark,
  Smartphone,
} from "lucide-react";

import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

import formatChartCurrency from "@/utils/formatChartCurrency";

import { useLanguage } from "@/contexts/LanguageContext";



function WalletSummary({
  wallets,
}) {


  const {
    language,
  } = useLanguage();




  const getWalletIcon = (name) => {

    const walletName =
      name.toLowerCase();



    if (walletName.includes("cash")) {
      return Wallet;
    }



    if (
      walletName.includes("bca") ||
      walletName.includes("mandiri") ||
      walletName.includes("bni") ||
      walletName.includes("bri")
    ) {
      return Landmark;
    }



    return Smartphone;

  };





  return (

    <Card>


      <div className="mb-6">


        <h2
          className="
            text-xl
            font-bold

            text-zinc-900
            dark:text-white
          "
        >

          {
            language === "id"
              ? "Ringkasan Dompet"
              : "Wallet Summary"
          }

        </h2>




        <p
          className="
            mt-1
            text-sm

            text-zinc-500
            dark:text-zinc-400
          "
        >

          {
            language === "id"
              ? "Saldo tersedia Anda"
              : "Your available balances"
          }

        </p>


      </div>






      {wallets.length === 0 ? (

        <EmptyState

          icon={Wallet}

          title={
            language === "id"
              ? "Dompet Tidak Ditemukan"
              : "No Wallet Found"
          }


          description={
            language === "id"
              ? "Buat dompet pertama Anda untuk mulai mencatat keuangan."
              : "Create your first wallet to start tracking your finances."
          }


          className="h-56"

        />


      ) : (



        <div className="space-y-4">


          {wallets.map((wallet) => {


            const Icon =
              getWalletIcon(wallet.name);




            return (


              <div

                key={wallet.id}

                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md

                  dark:border-zinc-800
                  dark:bg-zinc-950
                "

              >




                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >



                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-zinc-200

                      dark:bg-zinc-800
                    "
                  >

                    <Icon

                      className="
                        h-5
                        w-5

                        text-zinc-700
                        dark:text-white
                      "

                    />

                  </div>





                  <div>


                    <p
                      className="
                        font-semibold

                        text-zinc-900
                        dark:text-white
                      "
                    >

                      {wallet.name}

                    </p>




                    <p
                      className="
                        text-sm

                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >

                      {
                        language === "id"
                          ? "Saldo Tersedia"
                          : "Available Balance"
                      }

                    </p>



                  </div>




                </div>







                <h3
                  className="
                    text-lg
                    font-bold

                    text-zinc-900
                    dark:text-white
                  "
                >

                  {
                    formatChartCurrency(
                      wallet.balance,
                      language
                    )
                  }

                </h3>




              </div>


            );

          })}



        </div>


      )}



    </Card>

  );

}


export default WalletSummary;