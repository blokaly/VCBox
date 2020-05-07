package com.vhcindyapp;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.hyperledger.indy.sdk.ErrorCode;
import org.hyperledger.indy.sdk.IndyException;
import org.hyperledger.indy.sdk.anoncreds.AnoncredsResults;
import org.hyperledger.indy.sdk.did.Did;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.hyperledger.indy.sdk.wallet.WalletAlreadyOpenedException;
import org.hyperledger.indy.sdk.wallet.WalletExistsException;
import org.json.JSONObject;

import java.util.Hashtable;
import java.util.Map;
import java.util.Random;

import static org.hyperledger.indy.sdk.anoncreds.Anoncreds.proverCreateCredentialReq;
import static org.hyperledger.indy.sdk.anoncreds.Anoncreds.proverCreateMasterSecret;
import static org.hyperledger.indy.sdk.did.Did.createAndStoreMyDid;

public class IndyModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    private volatile Wallet wallet;

    public IndyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "IndyModule";
    }

    @ReactMethod
    public void createWallet(Promise promise) {
        try {
            String proverWalletConfig = new JSONObject().put("id", "proverWallet" + new Random().nextInt()).toString();
            String proverWalletCredentials = new JSONObject().put("key", "prover_wallet_key").toString();
            Wallet.createWallet(proverWalletConfig, proverWalletCredentials).get();
            Wallet proverWallet = Wallet.openWallet(proverWalletConfig, proverWalletCredentials).get();
            wallet = proverWallet;
            promise.resolve(true);
        } catch (Throwable e) {
            if ( e instanceof WalletExistsException) {
                promise.resolve(true);
            } else {
                promise.reject("Failure", e);
            }
        }
    }

    @ReactMethod
    public void openWallet(Promise promise) {
        try {
            String proverWalletConfig = new JSONObject().put("id", "proverWallet").toString();
            String proverWalletCredentials = new JSONObject().put("key", "prover_wallet_key").toString();
            Wallet proverWallet = Wallet.openWallet(proverWalletConfig, proverWalletCredentials).get();
            wallet = proverWallet;
            promise.resolve(proverWallet.getWalletHandle());
        } catch (Throwable e) {
            if (e instanceof WalletAlreadyOpenedException) {
                promise.resolve(wallet.getWalletHandle());
            } else {
                promise.reject("Failure", e);
            }
        }
    }

    @ReactMethod
    public void createDid(Promise promise) {
        try {
            proverCreateMasterSecret(wallet, "charlie").get();
            String proverDid = createAndStoreMyDid(wallet, "{\"seed\":\"0000000000000000000000000Charlie\"}").get().getDid();
            promise.resolve(proverDid);
        } catch (Throwable e) {
            //TODO: handle exception
            promise.reject("Failure", e);
        }
    }

    @ReactMethod
    public void createCredRequest(String did, String offerJson, String defJson, Promise promise) {
        try {
            AnoncredsResults.ProverCreateCredentialRequestResult createCredReqResult =
                    proverCreateCredentialReq(wallet, did, offerJson, defJson, "charlie").get();
            promise.resolve(createCredReqResult.getCredentialRequestJson());
        } catch (Throwable e) {
            //TODO: handle exception
            promise.reject("Failure", e);
        }
    }
}
