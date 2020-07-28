import host from '../const/host';

async function loadSmallData(setData: Function, setLoading: Function, setError: Function): Promise<any> {
  setError(false);
  setLoading(true);
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, 10000);
  const data = await fetch(`${host}/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
    signal: controller.signal,
  }).then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json())
    .catch(() => setError(true));

  setData(data || []);
  setLoading(false);
}

async function loadBigData(setData: Function, setLoading: Function, setError: Function): Promise<any> {
  setError(false);
  setLoading(true);
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, 30000);
  const data = await fetch(`${host}/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
    signal: controller.signal,
  }).then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json())
    .catch(() => setError(true));
  setData(data || []);
  setLoading(false);
}

export {
  loadSmallData,
  loadBigData,
};
