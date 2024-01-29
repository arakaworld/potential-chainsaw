package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"

	"github.com/arakaworld/potential-chainsaw/cli/mycoin"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		panic(err)
	}

	contractAddr := os.Args[1] // スマートコントラクトのアドレス
	apiKey := os.Getenv("API_KEY")
	signerPrvKey := os.Getenv("PRIVATE_KEY")
	host := fmt.Sprintf("https://goerli.infura.io/v3/%s", apiKey)

	// fmt.Println("🐹🐹🐹🐹🐹🐹🐹🐹🐹🐹")
	// fmt.Println(contractAddr)
	// fmt.Println(apiKey)
	// fmt.Println(signerPrvKey)
	// fmt.Println(host)
	// fmt.Println("🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶")

	config := mycoin.Config{
		Host:         host,
		Port:         nil,
		ContractAddr: contractAddr,
		SignerPrvkey: signerPrvKey,
	}
	cl, err := mycoin.InitClient(config)
	if err != nil {
		panic(err)
	}

	symbol, err := cl.Instance.Symbol(nil)
	if err != nil {
		panic(err)
	}
	fmt.Printf("🌟 symbol: %s\n", symbol)
}
