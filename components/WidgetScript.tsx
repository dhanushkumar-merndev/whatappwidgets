"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function WidgetScript(props: { config: "tansi" | "bigwing" }) {
  const pathname = usePathname();

  useEffect(() => {
    var existingScript = document.getElementById("_widget-script-loader");
    if (existingScript) {
      existingScript.remove();
    }

    var script = document.createElement("script");
    script.id = "_widget-script-loader";
    script.src = "/tansi.js";
    script.async = true;
    script.setAttribute("data-config", props.config);
    document.body.appendChild(script);

    return () => {
      script.remove();

      var button = document.getElementById("_wabtn");
      var popup = document.getElementById("_wapop");
      var styleTag = document.getElementById("_wastyle");

      if (button) button.remove();
      if (popup) popup.remove();
      if (styleTag) styleTag.remove();
    };
  }, [props.config, pathname]);

  return null;
}
