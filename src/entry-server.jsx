import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';

export function render(url) {
  const helmetContext = {};

  const appHtml = renderToString(
    <App
      isSSR={true}
      RouterComponent={StaticRouter}
      routerProps={{ location: url }}
      helmetContext={helmetContext}
    />
  );

  return {
    appHtml,
    helmet: helmetContext.helmet,
  };
}
