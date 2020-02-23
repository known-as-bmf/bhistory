// interface UseLinkHookResult {
//   href: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
//   onClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
// }

// interface UseLinkHookOptions {
//   replace?: boolean;
// }

// function createBrowserHistoryBundle(baseUrl: string) {
//   return {
//     useLink(
//       to: string,
//       { replace = false }: UseLinkHookOptions = {}
//     ): UseLinkHookResult {
//       const href = useMemo(() => joinAbsolutePath(baseUrl, to), [to]);
//       const onClick = useCallback(() => navigate(to, replace), [to, replace]);

//       return useMemo(() => ({ href, onClick }), [href, onClick]);
//     },
//   };
// }
