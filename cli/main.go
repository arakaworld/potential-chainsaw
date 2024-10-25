package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

	"github.com/arakaworld/potential-chainsaw/cli/mycoin"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal(err)
	}

	if len(os.Args) < 2 {
		log.Fatal("Contract address argument is missing")
	}

	contractAddr := os.Args[1] // スマートコントラクトのアドレス
	apiKey := os.Getenv("API_KEY")
	signerPrvKey := os.Getenv("PRIVATE_KEY")

	if apiKey == "" {
		log.Fatal("API_KEY environment variable is not set")
	}

	if signerPrvKey == "" {
		log.Fatal("PRIVATE_KEY environment variable is not set")
	}

	host := fmt.Sprintf("https://goerli.infura.io/v3/%s", apiKey)

	config := mycoin.Config{
		Host:         host,
		Port:         nil,
		ContractAddr: contractAddr,
		SignerPrvkey: signerPrvKey,
	}
	cl, err := mycoin.InitClient(config)
	if err != nil {
		log.Fatal(err)
	}

	symbol, err := cl.Instance.Symbol(nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("🌟 symbol: %s\n", symbol)
}
