import "../styles/DinheiroForm.css";

function DinheiroForm({
    troco,
    setTroco,
    semTroco,
    setSemTroco
}) {

    function handleTroco(event) {
        setTroco(event.target.value);
    }

    function handleSemTroco(event) {

        setSemTroco(event.target.checked);

        if (event.target.checked) {
            setTroco("");
        }

    }

    return (

        <div className="dinheiro-form">

            <h3>Pagamento em dinheiro</h3>

            <label className="checkbox">

                <input
                    type="checkbox"
                    checked={semTroco}
                    onChange={handleSemTroco}
                />

                Não preciso de troco

            </label>

            {!semTroco && (

                <div className="input-field">

                    <label>Troco para</label>

                    <input
                        type="number"
                        value={troco}
                        onChange={handleTroco}
                        placeholder="0,00"
                        min="0"
                        step="0.01"
                    />

                </div>

            )}

        </div>

    );

}

export default DinheiroForm;